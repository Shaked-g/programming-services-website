"use client"

import { Brain, Layers, Cloud, Database, Shield, Zap } from "lucide-react"
import { useTranslations } from "next-intl"

export function Expertise() {
  const t = useTranslations('expertise')

  const expertiseAreas = [
    {
      icon: Brain,
      title: t('areas.ai.title'),
      description: t('areas.ai.description'),
      technologies: t.raw('areas.ai.technologies'),
    },
    {
      icon: Layers,
      title: t('areas.fullstack.title'),
      description: t('areas.fullstack.description'),
      technologies: t.raw('areas.fullstack.technologies'),
    },
    {
      icon: Cloud,
      title: t('areas.cloud.title'),
      description: t('areas.cloud.description'),
      technologies: t.raw('areas.cloud.technologies'),
    },
    {
      icon: Database,
      title: t('areas.data.title'),
      description: t('areas.data.description'),
      technologies: t.raw('areas.data.technologies'),
    },
    {
      icon: Shield,
      title: t('areas.security.title'),
      description: t('areas.security.description'),
      technologies: t.raw('areas.security.technologies'),
    },
    {
      icon: Zap,
      title: t('areas.performance.title'),
      description: t('areas.performance.description'),
      technologies: t.raw('areas.performance.technologies'),
    },
  ]
  return (
    <section id="expertise" className="py-24 sm:py-32 bg-secondary/30 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--border)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

        {/* Expertise Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertiseAreas.map((area, index) => (
            <div
              key={area.title}
              className="group relative p-6 rounded-2xl border border-border/50 bg-background/50 hover:bg-background hover:border-border transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4 transition-transform group-hover:scale-110">
                <area.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{area.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{area.description}</p>
              <div className="flex flex-wrap gap-2">
                {(area.technologies as string[]).map((tech: string) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
