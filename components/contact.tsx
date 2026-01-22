"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useTranslations } from "next-intl"

export function Contact() {
  const t = useTranslations('contact')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    service: "",
    deadline: "",
    academicLevel: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      toast.success(t('success.title'), {
        description: data.message || t('success.description'),
      })

      setIsSubmitted(true)
      setFormData({
        name: "",
        email: "",
        subject: "",
        service: "",
        deadline: "",
        academicLevel: "",
        message: "",
      })

      setTimeout(() => setIsSubmitted(false), 3000)
    } catch (error) {
      toast.error("Failed to send message", {
        description: error instanceof Error ? error.message : "Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Background effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/5 blur-[100px] rounded-full" />

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

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{t('info.email.title')}</p>
                  <p className="text-muted-foreground text-sm">{t('info.email.value')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{t('info.phone.title')}</p>
                  <p className="text-muted-foreground text-sm">{t('info.phone.value')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{t('info.location.title')}</p>
                  <p className="text-muted-foreground text-sm">{t('info.location.value')}</p>
                  <p className="text-muted-foreground text-sm">{t('info.location.additional')}</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <p className="font-medium mb-3">{t('process.title')}</p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {t.raw('process.steps').map((step: string, index: number) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-3 border-border/50 bg-card/50">
            <CardHeader>
              <CardTitle>{t('form.title')}</CardTitle>
              <CardDescription>{t('form.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('form.fields.name')}</Label>
                    <Input
                      id="name"
                      placeholder={t('form.placeholders.name')}
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('form.fields.email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('form.placeholders.email')}
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">{t('form.fields.subject')}</Label>
                  <Input
                    id="subject"
                    placeholder={t('form.placeholders.subject')}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="service">{t('form.fields.service')}</Label>
                    <select
                      id="service"
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      disabled={isSubmitting}
                    >
                      <option value="">{t('form.services.placeholder')}</option>
                      <option value="programming">{t('form.services.programming')}</option>
                      <option value="humanities">{t('form.services.humanities')}</option>
                      <option value="social_work">{t('form.services.social_work')}</option>
                      <option value="multidisciplinary">{t('form.services.multidisciplinary')}</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="academicLevel">{t('form.fields.academic_level')}</Label>
                    <select
                      id="academicLevel"
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      value={formData.academicLevel}
                      onChange={(e) => setFormData({ ...formData, academicLevel: e.target.value })}
                      disabled={isSubmitting}
                    >
                      <option value="">Select level</option>
                      <option value="high-school">High School</option>
                      <option value="undergraduate">Undergraduate</option>
                      <option value="graduate">Graduate</option>
                      <option value="phd">PhD</option>
                      <option value="professional">Professional</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">{t('form.fields.deadline')}</Label>
                  <Input
                    id="deadline"
                    placeholder={t('form.placeholders.deadline')}
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t('form.fields.message')}</Label>
                  <Textarea
                    id="message"
                    placeholder={t('form.placeholders.message')}
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    disabled={isSubmitting}
                  />
                </div>
                <Button type="submit" className="w-full group" disabled={isSubmitted || isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t('form.sending')}
                    </>
                  ) : isSubmitted ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      {t('form.sent')}
                    </>
                  ) : (
                    <>
                      {t('form.submit')}
                      <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
