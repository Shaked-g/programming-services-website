import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { sendSlackNotification, formatProjectRequestMessage } from '@/lib/slack'
import type { ProjectRequestSubmission } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      serviceType,
      projectTitle,
      projectDescription,
      currentState,
      desiredOutcome,
      hasExistingCode,
      repoAccess,
      techExpertise,
      currentStack,
      timeline,
      budget,
      startDate,
      name,
      email,
      company,
      role,
      phone,
      preferredContact,
      additionalNotes,
    } = body

    // Basic validation
    if (!serviceType || !projectTitle || !projectDescription || !name || !email) {
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
    const submission: ProjectRequestSubmission = {
      serviceType,
      projectTitle,
      projectDescription,
      currentState: currentState || undefined,
      desiredOutcome: desiredOutcome || undefined,
      hasExistingCode: hasExistingCode || undefined,
      repoAccess: repoAccess || undefined,
      techExpertise: techExpertise || [],
      currentStack: currentStack || {},
      timeline,
      budget,
      startDate: startDate || undefined,
      name,
      email,
      company: company || undefined,
      role: role || undefined,
      phone: phone || undefined,
      preferredContact: preferredContact || 'email',
      additionalNotes: additionalNotes || undefined,
      submittedAt: new Date(),
    }

    // Save to MongoDB
    try {
      const db = await getDatabase()
      const collection = db.collection<ProjectRequestSubmission>('project-requests')
      const result = await collection.insertOne(submission)
      console.log('✅ Project request saved to MongoDB:', result.insertedId)
    } catch (dbError) {
      console.error('❌ Database error:', dbError)
      // Continue even if DB fails - we still want to send Slack notification
    }

    // Send Slack notification
    try {
      const slackMessage = formatProjectRequestMessage({
        serviceType,
        projectTitle,
        projectDescription,
        name,
        email,
        company,
        timeline,
        budget,
        techExpertise: techExpertise || [],
        currentStack: currentStack || {},
      })
      await sendSlackNotification(slackMessage)
    } catch (slackError) {
      console.error('❌ Slack notification error:', slackError)
      // Continue even if Slack fails - we still saved to DB
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your project request has been submitted! We\'ll review it and get back to you within 24 hours with a tailored proposal.' 
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
