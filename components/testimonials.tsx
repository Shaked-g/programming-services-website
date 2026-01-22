"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "CodeCraft Labs transformed our legacy codebase into a modern, scalable system. The team's expertise in AI integration helped us automate 70% of our manual processes.",
    author: "Sarah Chen",
    role: "CTO, TechFlow Inc.",
    avatar: "SC",
  },
  {
    quote:
      "Their demo-to-production service was exactly what we needed. They took our MVP and made it enterprise-ready in just 8 weeks. Exceptional communication throughout.",
    author: "Michael Rodriguez",
    role: "Founder, DataPulse",
    avatar: "MR",
  },
  {
    quote:
      "The consulting engagement gave us clarity on our technical direction. Their architecture recommendations saved us months of potential rework down the line.",
    author: "Emily Watson",
    role: "VP Engineering, CloudScale",
    avatar: "EW",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-secondary/30 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-medium text-accent mb-3 tracking-wide uppercase">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Trusted by innovative teams
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.author}
              className="border-border/50 bg-background/50 hover:bg-background transition-colors"
            >
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-accent/30 mb-4" />
                <p className="text-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent text-sm font-semibold">
                    {testimonial.avatar}
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
