"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { useTranslations } from "next-intl"

export function Testimonials() {
  const t = useTranslations('testimonials')

  return (
    <section className="py-24 sm:py-32 bg-secondary/30 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-medium text-accent mb-3 tracking-wide uppercase">{t('section.badge')}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            {t('section.title')}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {(t.raw('items') as Array<{quote: string; author: string; role: string}>).map((testimonial, index) => (
            <Card
              key={testimonial.author}
              className="border-border/50 bg-background/50 hover:bg-background transition-colors"
            >
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-accent/30 mb-4" />
                <p className="text-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent text-sm font-semibold">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.author}</p>
                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
