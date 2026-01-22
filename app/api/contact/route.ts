import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { sendSlackNotification, formatContactMessage } from '@/lib/slack'
import type { ContactSubmission } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, service, message } = body

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
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
    const submission: ContactSubmission = {
      name,
      email,
      company: company || undefined,
      service,
      message,
      submittedAt: new Date(),
    }

    // Save to MongoDB
    try {
      const db = await getDatabase()
      const collection = db.collection<ContactSubmission>('contact-submissions')
      const result = await collection.insertOne(submission)
      console.log('✅ Contact submission saved to MongoDB:', result.insertedId)
    } catch (dbError) {
      console.error('❌ Database error:', dbError)
      // Continue even if DB fails - we still want to send Slack notification
    }

    // Send Slack notification
    try {
      const slackMessage = formatContactMessage({
        name,
        email,
        company,
        service,
        message,
      })
      await sendSlackNotification(slackMessage)
    } catch (slackError) {
      console.error('❌ Slack notification error:', slackError)
      // Continue even if Slack fails - we still saved to DB
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your message! We\'ll get back to you within 24 hours.' 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again.' },
      { status: 500 }
    )
  }
}
