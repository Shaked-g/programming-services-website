type EmailNotificationInput = {
  formType: string
  subject: string
  payload: Record<string, unknown>
  origin?: string
}

function getFormSubmitRecipientEmail(): string | null {
  const raw = process.env.FORM_SUBMIT_EMAIL?.trim()
  const email =
    raw && ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'")))
      ? raw.slice(1, -1).trim()
      : raw

  if (!email) {
    console.warn('FORM_SUBMIT_EMAIL not set, skipping email notification')
    return null
  }

  return email
}

export async function sendFormSubmitEmail(input: EmailNotificationInput): Promise<void> {
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
