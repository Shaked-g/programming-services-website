import { NextResponse } from "next/server"
import { getDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    const db = await getDatabase()
    const visitors = db.collection("site-visitors")

    const [stats] = await visitors
      .aggregate<{ totalVisits: number }>([
        {
          $group: {
            _id: null,
            totalVisits: { $sum: "$visits" },
          },
        },
      ])
      .toArray()

    const uniqueVisitors = await visitors.countDocuments()

    return NextResponse.json(
      {
        uniqueVisitors,
        totalVisits: stats?.totalVisits || 0,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Visitor stats error:", error)
    return NextResponse.json({ error: "Failed to load visitor stats" }, { status: 500 })
  }
}
