import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { sendSlackNotification, formatAssignmentRequestMessage } from '@/lib/slack'
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
      submittedAt: new Date(),
    }

    // Save to MongoDB
    try {
      const db = await getDatabase()
      const collection = db.collection<AssignmentRequestSubmission>('assignment-requests')
      const result = await collection.insertOne(submission)
      console.log('✅ Project request saved to MongoDB:', result.insertedId)
    } catch (dbError) {
      console.error('❌ Database error:', dbError)
      // Continue even if DB fails - we still want to send Slack notification
    }

    // Send Slack notification
    try {
      const slackMessage = formatAssignmentRequestMessage({
        assignmentType,
        assignmentTitle,
        assignmentDescription,
        subjectArea,
        academicLevel,
        name,
        email,
        university,
        deadline,
        academicExpertise: academicExpertise || [],
        requiredSources: requiredSources || {},
      })
      await sendSlackNotification(slackMessage)
    } catch (slackError) {
      console.error('❌ Slack notification error:', slackError)
      // Continue even if Slack fails - we still saved to DB
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
