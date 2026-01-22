export async function sendSlackNotification(message: string): Promise<void> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL

  if (!webhookUrl) {
    console.warn('SLACK_WEBHOOK_URL not set, skipping Slack notification')
    return
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: message,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Slack API error: ${response.statusText} - ${errorText}`)
    }

    console.log('✅ Slack notification sent successfully')
  } catch (error) {
    console.error('❌ Failed to send Slack notification:', error)
    // Don't throw - we don't want Slack failures to break form submissions
  }
}

export function formatContactMessage(data: {
  name: string
  email: string
  company?: string
  service: string
  message: string
}): string {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return `📧 *New Contact Form Submission*

*Name:* ${data.name}
*Email:* ${data.email}
${data.company ? `*Company:* ${data.company}` : ''}
*Service Interested In:* ${data.service}

*Message:*
${data.message}

_Submitted: ${timestamp}_`
}

export function formatProjectRequestMessage(data: {
  serviceType: string
  projectTitle: string
  projectDescription: string
  name: string
  email: string
  company?: string
  timeline: string
  budget: string
  techExpertise: string[]
  currentStack: Record<string, string[]>
}): string {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const stackSummary = Object.entries(data.currentStack)
    .filter(([_, techs]) => techs.length > 0)
    .map(([category, techs]) => `  • ${category}: ${techs.join(', ')}`)
    .join('\n')

  // Map service types to readable names
  const serviceTypeMap: Record<string, string> = {
    'codebase-fix': 'Codebase Fixes & Optimization',
    'demo-to-production': 'Demo to Production',
    'consulting': 'Technical Consulting',
    'full-development': 'Full Development',
  }

  // Map budget IDs to readable labels
  const budgetMap: Record<string, string> = {
    'under-1k': 'Under $1,000',
    '1k-5k': '$1,000 - $5,000',
    'under-5k': 'Under $5,000',
    '5k-15k': '$5,000 - $15,000',
    '15k-50k': '$15,000 - $50,000',
    '50k-100k': '$50,000 - $100,000',
    '100k-plus': '$100,000+',
    'discuss': "Let's Discuss",
  }

  const readableServiceType = serviceTypeMap[data.serviceType] || data.serviceType
  const readableBudget = budgetMap[data.budget] || data.budget

  return `🚀 *New Project Request*

*Service Type:* ${readableServiceType}
*Project Title:* ${data.projectTitle}
*Client:* ${data.name} (${data.email})
${data.company ? `*Company:* ${data.company}` : ''}
*Timeline:* ${data.timeline}
*Budget:* ${readableBudget}

*Project Description:*
${data.projectDescription}

*Tech Expertise Needed:*
${data.techExpertise.length > 0 ? data.techExpertise.map(t => `  • ${t}`).join('\n') : '  • None specified'}

${stackSummary ? `*Current/Preferred Stack:*\n${stackSummary}` : ''}

_Submitted: ${timestamp}_`
}
