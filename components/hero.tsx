"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

export function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] animate-pulse-glow" />
        <div
          className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px] animate-pulse-glow"
          style={{ animationDelay: "1.5s" }}
        />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm mb-8 glass-effect">
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-muted-foreground">{t('badge')}</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance max-w-5xl mx-auto">
          <span className="block">{t('title.line1')}</span>
          <span className="block mt-2 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent animate-gradient">
            {t('title.line2')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
          {t('subtitle')}
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="w-full sm:w-auto group" asChild>
            <Link href="/request">
              {t('cta.primary')}
              <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto bg-transparent"
            onClick={(e) => {
              e.preventDefault()
              const element = document.querySelector("#services")
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            }}
          >
            {t('cta.secondary')}
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { value: t('stats.projects.value'), label: t('stats.projects.label') },
            { value: t('stats.satisfaction.value'), label: t('stats.satisfaction.label') },
            { value: t('stats.clients.value'), label: t('stats.clients.label') },
            { value: t('stats.support.value'), label: t('stats.support.label') },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
