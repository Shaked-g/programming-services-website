import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { sendFormSubmitEmail } from '@/lib/formsubmit'
import type { AssignmentRequestSubmission } from '@/lib/types'

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

    // Send email notification (FormSubmit)
    try {
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
          submittedAt: new Date().toISOString(),
        },
      })
    } catch (emailError) {
      console.error('❌ FormSubmit email error:', emailError)
      return NextResponse.json(
        {
          error:
            "Request saved, but email delivery failed. Please activate FormSubmit from your inbox (or spam folder) and try again.",
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
