import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { sendFormSubmitEmail } from '@/lib/formsubmit'
import type { AssignmentRequestSubmission } from '@/lib/types'

const assignmentTypeLabelsHe: Record<string, string> = {
  programming: 'תכנות',
  humanities: 'מדעי הרוח',
  social_work: 'עבודה סוציאלית',
  multidisciplinary: 'רב-תחומי',
}

const academicLevelLabelsHe: Record<string, string> = {
  'high-school': 'תיכון',
  undergraduate: 'תואר ראשון',
  graduate: 'תואר שני',
  phd: 'דוקטורט',
  professional: 'מקצועי',
}

const deadlineLabelsHe: Record<string, string> = {
  'urgent-24h': 'דחוף (24 שעות)',
  'urgent-3days': 'דחוף (3 ימים)',
  week: 'שבוע',
  '2-weeks': 'שבועיים',
  month: 'חודש',
  flexible: 'גמיש',
}

const budgetLabelsHe: Record<string, string> = {
  '300-500': '₪300-₪500',
  '500-700': '₪500-₪700',
  '700-900': '₪700-₪900',
  '1000-2000': '₪1,000-₪2,000',
  '2000+': '₪2,000+',
}

const preferredContactLabelsHe: Record<string, string> = {
  email: 'אימייל',
  phone: 'טלפון',
  whatsapp: 'וואטסאפ',
  either: 'אימייל או טלפון',
}

const hasExistingWorkLabelsHe: Record<string, string> = {
  yes: 'כן',
  no: 'לא',
  partial: 'חלקי',
}

const urgencyLevelLabelsHe: Record<string, string> = {
  standard: 'רגיל',
  urgent: 'דחוף',
}

const academicExpertiseLabelsHe: Record<string, string> = {
  psychology: 'פסיכולוגיה',
  education: 'חינוך',
  philosophy: 'פילוסופיה',
  sociology: 'סוציולוגיה',
  history: 'היסטוריה',
  literature: 'ספרות',
}

const sourceOptionLabelsHe: Record<string, string> = {
  APA: 'APA',
  MLA: 'MLA',
  Chicago: "שיקגו",
  Harvard: 'הרווארד',
  IEEE: 'IEEE',
  Other: 'אחר',
  'Academic Journals': 'כתבי עת אקדמיים',
  Books: 'ספרים',
  Websites: 'אתרי אינטרנט',
  Interviews: 'ראיונות',
  'Survey Data': 'נתוני סקרים',
  'Research Paper': 'עבודת מחקר',
  Essay: 'מאמר',
  'Case Study': 'חקר מקרה',
  'Literature Review': 'סקירת ספרות',
  Presentation: 'מצגת',
  '500-1000': '500-1000 מילים',
  '1000-2000': '1000-2000 מילים',
  '2000-5000': '2000-5000 מילים',
  '5000+': '5000+ מילים',
  Flexible: 'גמיש',
}

function toHebrewLabel(map: Record<string, string>, value: unknown): string {
  if (typeof value !== 'string' || !value.trim()) return 'לא צוין'
  return map[value] || value
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      assignmentType,
      assignmentTitle,
      assignmentDescription,
      subjectArea,
      academicLevel,
      specificRequirements,
      hasExistingWork,
      citationStyle,
      academicExpertise,
      requiredSources,
      deadline,
      urgencyLevel,
      submissionDate,
      name,
      email,
      university,
      phone,
      preferredContact,
      additionalNotes,
      budget,
    } = body

    // Basic validation
    if (!assignmentType || !assignmentTitle || !assignmentDescription || !name || !email) {
      return NextResponse.json(
        { error: 'Required fields are missing' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Create submission document
    const submission: AssignmentRequestSubmission = {
      assignmentType,
      assignmentTitle,
      assignmentDescription,
      subjectArea: subjectArea || 'Not specified',
      academicLevel,
      specificRequirements: specificRequirements || undefined,
      hasExistingWork: hasExistingWork || undefined,
      citationStyle: citationStyle || 'Not specified',
      academicExpertise: academicExpertise || [],
      requiredSources: requiredSources || {},
      deadline,
      urgencyLevel: urgencyLevel || 'standard',
      submissionDate: submissionDate || undefined,
      name,
      email,
      university: university || undefined,
      phone: phone || undefined,
      preferredContact: preferredContact || 'email',
      additionalNotes: additionalNotes || undefined,
      budget: budget || 'Not specified',
      submittedAt: new Date(),
    }

    // Save to MongoDB
    try {
      const db = await getDatabase()
      const collection = db.collection<AssignmentRequestSubmission>('assignment-requests')
      const result = await collection.insertOne(submission)
      console.log('✅ Project request saved to MongoDB')
    } catch (dbError) {
      console.error('❌ Database error:', dbError)
      // Continue even if DB fails - we still want to send email notification
    }

    // Send email notification (Resend when configured)
    try {
      const expertiseList = Array.isArray(academicExpertise) ? academicExpertise : []
      const sourcesObject =
        requiredSources && typeof requiredSources === 'object'
          ? (requiredSources as Record<string, unknown>)
          : {}
      const requiredSourcesLabelsHe = Object.fromEntries(
        Object.entries(sourcesObject).map(([category, selectedOptions]) => [
          category,
          Array.isArray(selectedOptions)
            ? selectedOptions.map((option) =>
                typeof option === 'string' ? toHebrewLabel(sourceOptionLabelsHe, option) : String(option),
              )
            : [],
        ]),
      )

      await sendFormSubmitEmail({
        formType: 'Assignment Request',
        subject: `New Assignment Request from ${name}`,
        origin: request.nextUrl.origin,
        payload: {
          assignmentType,
          assignmentTitle,
          assignmentDescription,
          subjectArea: subjectArea || 'Not specified',
          academicLevel,
          specificRequirements: specificRequirements || 'Not specified',
          hasExistingWork: hasExistingWork || 'Not specified',
          citationStyle: citationStyle || 'Not specified',
          academicExpertise: academicExpertise || [],
          requiredSources: requiredSources || {},
          deadline,
          urgencyLevel: urgencyLevel || 'standard',
          submissionDate: submissionDate || 'Not specified',
          name,
          email,
          university: university || 'Not specified',
          phone: phone || 'Not specified',
          preferredContact: preferredContact || 'email',
          additionalNotes: additionalNotes || 'Not specified',
          budget: budget || 'Not specified',
          budgetRange: budget || 'Not specified',
          budgetLabelHeCurrency: toHebrewLabel(budgetLabelsHe, budget),
          assignmentTypeLabelHe: toHebrewLabel(assignmentTypeLabelsHe, assignmentType),
          academicLevelLabelHe: toHebrewLabel(academicLevelLabelsHe, academicLevel),
          hasExistingWorkLabelHe: toHebrewLabel(hasExistingWorkLabelsHe, hasExistingWork),
          deadlineLabelHe: toHebrewLabel(deadlineLabelsHe, deadline),
          urgencyLevelLabelHe: toHebrewLabel(urgencyLevelLabelsHe, urgencyLevel || 'standard'),
          preferredContactLabelHe: toHebrewLabel(preferredContactLabelsHe, preferredContact || 'email'),
          budgetLabelHe: toHebrewLabel(budgetLabelsHe, budget),
          academicExpertiseLabelsHe: expertiseList.map((item) => toHebrewLabel(academicExpertiseLabelsHe, item)),
          requiredSourcesLabelsHe,
          submittedAt: new Date().toISOString(),
        },
      })
    } catch (emailError) {
      console.error('❌ Email notification error:', emailError)
      const debugMessage =
        emailError instanceof Error ? emailError.message : 'Unknown email delivery error'
      return NextResponse.json(
        {
          error:
            "Request saved, but email delivery failed. Please check your email provider configuration and try again.",
          debugMessage,
        },
        { status: 502 },
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your assignment request has been submitted! We\'ll match you with an academic expert and get back to you within 24 hours.'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Project request error:', error)
    return NextResponse.json(
      { error: 'Failed to submit request. Please try again.' },
      { status: 500 }
    )
  }
}
