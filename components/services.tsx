"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wrench, Rocket, MessageSquare, Code2, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

export function Services() {
  const t = useTranslations('services')

  const services = [
    {
      icon: Wrench,
      title: t('items.codebase.title'),
      description: t('items.codebase.description'),
      features: t.raw('items.codebase.features'),
      badge: t('items.codebase.badge'),
    },
    {
      icon: Rocket,
      title: t('items.demo.title'),
      description: t('items.demo.description'),
      features: t.raw('items.demo.features'),
    },
    {
      icon: MessageSquare,
      title: t('items.consulting.title'),
      description: t('items.consulting.description'),
      features: t.raw('items.consulting.features'),
    },
    {
      icon: Code2,
      title: t('items.development.title'),
      description: t('items.development.description'),
      features: t.raw('items.development.features'),
    },
  ]
  return (
    <section id="services" className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-medium text-accent mb-3 tracking-wide uppercase">{t('section.badge')}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            {t('section.title')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            {t('section.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group relative overflow-hidden border-border/50 bg-card/50 hover:bg-card hover:border-border transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <service.icon className="h-6 w-6" />
                  </div>
                  {service.badge && (
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                      {service.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl mt-4">{service.title}</CardTitle>
                <CardDescription className="text-muted-foreground text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-2 gap-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault()
                    const element = document.querySelector("#contact")
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                  }}
                  className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-foreground hover:text-accent transition-colors group/link"
                >
                  {t('learnMore')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
