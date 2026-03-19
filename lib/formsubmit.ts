type EmailNotificationInput = {
  formType: string
  subject: string
  payload: Record<string, unknown>
  origin?: string
}

function parsePossiblyQuotedEnv(raw?: string): string | null {
  const value = raw?.trim()
  if (!value) return null
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1).trim()
  }
  return value
}

function extractEmailAddress(input: string): string {
  // Accept formats like:
  // - onboarding@resend.dev
  // - "Name <onboarding@resend.dev>"
  const match = input.match(/<([^>]+)>/)
  if (match?.[1]) return match[1].trim()
  return input.trim()
}

function getResendRecipientEmail(): string {
  // If the user hasn't configured anything, fall back to Resend onboarding.
  return (
    extractEmailAddress(
      parsePossiblyQuotedEnv(process.env.RESEND_TO_EMAIL) ||
        parsePossiblyQuotedEnv(process.env.FORM_SUBMIT_EMAIL) ||
        "onboarding@resend.dev",
    )
  )
}

function getResendApiKey(): string | null {
  return parsePossiblyQuotedEnv(process.env.RESEND_API_KEY)
}

function getResendFromEmail(): string | null {
  const from = parsePossiblyQuotedEnv(process.env.RESEND_FROM_EMAIL)
  if (!from) return null
  return extractEmailAddress(from)
}

async function sendViaResend(input: EmailNotificationInput): Promise<void> {
  const apiKey = getResendApiKey()
  const from = getResendFromEmail()
  if (!apiKey || !from) {
    throw new Error("Resend is not configured (missing RESEND_API_KEY or RESEND_FROM_EMAIL)")
  }

  const to = getResendRecipientEmail()

  const textLines: string[] = [
    `Form Type: ${input.formType}`,
    `Subject: ${input.subject}`,
  ]
  if (input.origin) textLines.push(`Origin: ${input.origin}`)
  textLines.push("")
  textLines.push("Payload:")
  textLines.push(JSON.stringify(input.payload, null, 2))

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject: input.subject,
      text: textLines.join("\n"),
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Resend API error: ${response.status} ${response.statusText} - ${errorText}`)
  }
}

function getFormSubmitRecipientEmail(): string | null {
  const email = parsePossiblyQuotedEnv(process.env.FORM_SUBMIT_EMAIL)

  if (!email) {
    console.warn('FORM_SUBMIT_EMAIL not set, skipping email notification')
    return null
  }

  return email
}

export async function sendFormSubmitEmail(input: EmailNotificationInput): Promise<void> {
  // Prefer Resend when configured.
  if (getResendApiKey() && getResendFromEmail()) {
    await sendViaResend(input)
    return
  }

  const recipientEmail = getFormSubmitRecipientEmail()
  if (!recipientEmail) return

  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(recipientEmail)}`
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
  }

  if (input.origin) {
    headers.Origin = input.origin
    headers.Referer = `${input.origin}/`
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      _subject: input.subject,
      _captcha: "false",
      formType: input.formType,
      ...input.payload,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`FormSubmit API error: ${response.status} ${response.statusText} - ${errorText}`)
  }

  const result = (await response.json()) as { success?: string | boolean; message?: string }
  const isSuccess = result.success === true || result.success === "true"

  if (!isSuccess) {
    throw new Error(result.message || "FormSubmit returned success=false")
  }
}
