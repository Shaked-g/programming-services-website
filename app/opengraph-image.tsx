import { ImageResponse } from "next/og"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0f172a 0%, #111827 50%, #1f2937 100%)",
          color: "#f8fafc",
          padding: "56px",
          fontFamily: "Arial, sans-serif",
          justifyContent: "space-between",
          alignItems: "stretch",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                background: "#22c55e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                fontWeight: 800,
                color: "#052e16",
              }}
            >
              A
            </div>
            <div style={{ fontSize: 36, fontWeight: 700 }}>Academic Assist</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 900 }}>
            <div style={{ fontSize: 64, lineHeight: 1.08, fontWeight: 800 }}>
              Professional Assignment Help Services
            </div>
            <div style={{ fontSize: 30, color: "#cbd5e1", lineHeight: 1.3 }}>
              Programming, Humanities, Social Work, and Multi-Disciplinary academic support.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 26, color: "#86efac" }}>
            <div>academicassist.org</div>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
