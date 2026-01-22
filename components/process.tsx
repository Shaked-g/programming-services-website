"use client"

import { MessageSquare, Search, Code, Rocket } from "lucide-react"
import { useTranslations } from "next-intl"

export function Process() {
  const t = useTranslations('process')

  const steps = [
    {
      icon: MessageSquare,
      number: "01",
      title: t('steps.discovery.title'),
      description: t('steps.discovery.description'),
    },
    {
      icon: Search,
      number: "02",
      title: t('steps.assessment.title'),
      description: t('steps.assessment.description'),
    },
    {
      icon: Code,
      number: "03",
      title: t('steps.development.title'),
      description: t('steps.development.description'),
    },
    {
      icon: Rocket,
      number: "04",
      title: t('steps.deployment.title'),
      description: t('steps.deployment.description'),
    },
  ]
  return (
    <section id="process" className="py-24 sm:py-32 relative overflow-hidden">
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

        {/* Process Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative text-center group">
                {/* Step number badge */}
                <div className="relative mx-auto mb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary border border-border text-foreground transition-all duration-300 group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent group-hover:scale-110">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-background border border-border text-xs font-bold">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
