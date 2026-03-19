"use client"

import { useEffect } from "react"

const VISITOR_ID_KEY = "siteVisitorId"

function getVisitorId(): string {
  const existing = window.localStorage.getItem(VISITOR_ID_KEY)
  if (existing) return existing

  const newId = crypto.randomUUID()
  window.localStorage.setItem(VISITOR_ID_KEY, newId)
  return newId
}

export function VisitorTracker() {
  useEffect(() => {
    const visitorId = getVisitorId()
    const payload = {
      visitorId,
      path: window.location.pathname,
      locale: document.documentElement.lang || "unknown",
    }

    void fetch("/api/analytics/visit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Quietly fail: tracking should never impact user experience.
    })
  }, [])

  return null
}
