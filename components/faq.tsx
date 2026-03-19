"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useTranslations } from "next-intl"

export function Faq() {
  const t = useTranslations('faq')

  const faqItems = [
    { question: t('items.plagiarism.question'), answer: t('items.plagiarism.answer') },
    { question: t('items.confidentiality.question'), answer: t('items.confidentiality.answer') },
    { question: t('items.pricing.question'), answer: t('items.pricing.answer') },
    { question: t('items.revisions.question'), answer: t('items.revisions.answer') },
    { question: t('items.deadlines.question'), answer: t('items.deadlines.answer') },
  ]

  return (
    <section id="faq" className="py-24 sm:py-32 bg-secondary/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-sm font-medium text-accent mb-3 tracking-wide uppercase">{t('section.badge')}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            {t('section.title')}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            {t('section.subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-border/50 bg-card/50 rounded-xl px-4">
                <AccordionTrigger className="text-left font-medium hover:no-underline hover:text-accent transition-colors">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
