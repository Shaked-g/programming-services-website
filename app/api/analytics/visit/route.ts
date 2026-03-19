import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

type VisitBody = {
  visitorId?: string
  path?: string
  locale?: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json().catch(() => ({}))) as VisitBody

    const visitorId = body.visitorId?.trim()
    if (!visitorId) {
      return NextResponse.json({ error: "visitorId is required" }, { status: 400 })
    }

    const db = await getDatabase()
    const visitors = db.collection("site-visitors")
    const now = new Date()

    await visitors.updateOne(
      { visitorId },
      {
        $setOnInsert: {
          visitorId,
          firstSeenAt: now,
        },
        $set: {
          lastSeenAt: now,
          lastPath: body.path || "/",
          locale: body.locale || "unknown",
        },
        $inc: {
          visits: 1,
        },
      },
      { upsert: true },
    )

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error("Visitor tracking error:", error)
    return NextResponse.json({ error: "Failed to track visitor" }, { status: 500 })
  }
}
