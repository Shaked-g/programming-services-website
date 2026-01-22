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

        {/* Disclaimer */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="flex items-start gap-3 p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
            <div className="text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm text-orange-800 dark:text-orange-200">
              <strong>{t('disclaimer.title')}</strong> {t('disclaimer.message')}
            </div>
          </div>
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
