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
  subject: string
  service: string
  deadline: string
  academicLevel: string
  message: string
}): string {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  return `📧 *New Academic Contact Inquiry*

*Name:* ${data.name}
*Email:* ${data.email}
*Subject:* ${data.subject}
*Service Interested In:* ${data.service}
*Deadline:* ${data.deadline}
*Academic Level:* ${data.academicLevel}

*Message:*
${data.message}

_Submitted: ${timestamp}_`
}

export function formatAssignmentRequestMessage(data: {
  assignmentType: string
  assignmentTitle: string
  assignmentDescription: string
  subjectArea: string
  academicLevel: string
  name: string
  email: string
  university?: string
  phone?: string
  deadline: string
  academicExpertise: string[]
  requiredSources: Record<string, string[]>
}): string {
  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles',
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  const sourcesSummary = Object.entries(data.requiredSources)
    .filter(([_, sources]) => sources.length > 0)
    .map(([category, sources]) => `  • ${category}: ${sources.join(', ')}`)
    .join('\n')

  // Map assignment types to readable names
  const assignmentTypeMap: Record<string, string> = {
    'programming': 'Programming & Computer Science',
    'humanities': 'Humanities & Social Sciences',
    'social-work': 'Social Work & Counseling',
    'multidisciplinary': 'Multi-Disciplinary Projects',
  }

  // Map academic levels to readable names
  const academicLevelMap: Record<string, string> = {
    'high-school': 'High School',
    'undergraduate': 'Undergraduate',
    'graduate': 'Graduate (Master\'s)',
    'phd': 'PhD',
    'professional': 'Professional Certification',
  }

  const readableAssignmentType = assignmentTypeMap[data.assignmentType] || data.assignmentType
  const readableAcademicLevel = academicLevelMap[data.academicLevel] || data.academicLevel

  return `📚 *New Assignment Request*

*Assignment Type:* ${readableAssignmentType}
*Assignment Title:* ${data.assignmentTitle}
*Student:* ${data.name} (${data.email})
${data.university ? `*University:* ${data.university}` : ''}
${data.phone ? `*Phone:* ${data.phone}` : ''}
*Subject Area:* ${data.subjectArea}
*Academic Level:* ${readableAcademicLevel}
*Deadline:* ${data.deadline}

*Assignment Description:*
${data.assignmentDescription}

*Academic Expertise Needed:*
${data.academicExpertise.length > 0 ? data.academicExpertise.map(expertise => `  • ${expertise}`).join('\n') : '  • None specified'}

${sourcesSummary ? `*Required Sources & Format:*\n${sourcesSummary}` : ''}

_Submitted: ${timestamp}_`
}
