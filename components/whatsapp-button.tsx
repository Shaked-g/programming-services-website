"use client"

import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLocale } from "next-intl"

export function WhatsAppButton() {
  const locale = useLocale()
  const isRTL = locale === "he"
  
  // Replace with the actual WhatsApp number
  const whatsappNumber = "+18328514092"
  const whatsappNumberDigits = whatsappNumber.replace(/^\+/, "")
  const message = locale === "he"
    ? "היי! אשמח לעזרה במטלת תכנות/פרויקט אקדמי.\nאפשר בבקשה לפרט: נושא/כותרת המטלה, הקורס (אם יש), דדליין, ורמת לימודים?\nאם יש דרישות פורמט/ציטוט או קבצים—אפשר לשלוח כאן."
    : "Hello, I'm interested in academic assignment help."
  
  const whatsappUrl = `https://wa.me/${whatsappNumberDigits}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 active:scale-95",
        isRTL ? "left-6" : "right-6"
      )}
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="h-8 w-8 fill-current" />
      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-bounce">
        1
      </span>
    </a>
  )
}
