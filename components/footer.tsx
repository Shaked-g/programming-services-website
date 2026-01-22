"use client"

import Link from "next/link"
import { Code2, Github, Linkedin, Twitter } from "lucide-react"
import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations('footer')

  const footerLinks = {
    services: [
      { label: t('links.services.programming'), href: "#services" },
      { label: t('links.services.humanities'), href: "#services" },
      { label: t('links.services.social_work'), href: "#services" },
      { label: t('links.services.multidisciplinary'), href: "#services" },
    ],
    expertise: [
      { label: t('links.expertise.programming'), href: "#expertise" },
      { label: t('links.expertise.psychology'), href: "#expertise" },
      { label: t('links.expertise.education'), href: "#expertise" },
      { label: t('links.expertise.philosophy'), href: "#expertise" },
    ],
    company: [
      { label: t('links.company.about'), href: "#about" },
      { label: t('links.company.process'), href: "#process" },
      { label: t('links.company.contact'), href: "#contact" },
      { label: t('links.company.faq'), href: "#" },
    ],
  }

  return (
    <footer id="about" className="border-t border-border bg-secondary/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Code2 className="h-5 w-5" />
              </div>
              <span className="text-xl font-semibold tracking-tight">
                Academic<span className="text-accent">Assist</span>
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground text-sm max-w-sm leading-relaxed">
              {t('description')}
            </p>
            <div className="flex items-center gap-4 mt-6">
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">{t('social.twitter')}</span>
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">{t('social.github')}</span>
              </Link>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">{t('social.linkedin')}</span>
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('sections.services')}</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t('sections.expertise')}</h3>
            <ul className="space-y-3">
              {footerLinks.expertise.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t('sections.company')}</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            {t('bottom.copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">
              {t('bottom.privacy')}
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              {t('bottom.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
