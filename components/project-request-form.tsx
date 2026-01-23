"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Wrench,
  Rocket,
  MessageSquare,
  Code2,
  Brain,
  Server,
  Cloud,
  Database,
  Shield,
  Zap,
  Clock,
  DollarSign,
  FileText,
  Send,
  CheckCircle,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl"




type FormData = {
  assignmentType: string
  assignmentTitle: string
  assignmentDescription: string
  subjectArea: string
  academicLevel: string
  specificRequirements: string
  hasExistingWork: string
  citationStyle: string
  academicExpertise: string[]
  requiredSources: Record<string, string[]>
  deadline: string
  urgencyLevel: string
  submissionDate: string
  name: string
  email: string
  university: string
  phone: string
  preferredContact: string
  additionalNotes: string
}

export function ProjectRequestForm() {
  const t = useTranslations('request')
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const steps = [
    { id: 1, name: t('steps.assignmentType'), icon: Sparkles },
    { id: 2, name: t('steps.assignmentDetails'), icon: FileText },
    { id: 3, name: t('steps.academicRequirements'), icon: Code2 },
    { id: 4, name: t('steps.timelineLevel'), icon: Clock },
    { id: 5, name: t('steps.contactInfo'), icon: Send },
  ]

  const academicExpertise = [
    { id: "psychology", label: t('academicRequirements.expertise.psychology'), icon: Brain },
    { id: "education", label: t('academicRequirements.expertise.education'), icon: Server },
    { id: "philosophy", label: t('academicRequirements.expertise.philosophy'), icon: Cloud },
    { id: "sociology", label: t('academicRequirements.expertise.sociology'), icon: Database },
    { id: "history", label: t('academicRequirements.expertise.history'), icon: Shield },
    { id: "literature", label: t('academicRequirements.expertise.literature'), icon: Zap },
  ]

  const academicRequirements = [
    {
      category: t('academicRequirements.categories.citationStyle'),
      options: [
        { key: "APA", label: t('academicRequirements.options.citationStyle.APA') },
        { key: "MLA", label: t('academicRequirements.options.citationStyle.MLA') },
        { key: "Chicago", label: t('academicRequirements.options.citationStyle.Chicago') },
        { key: "Harvard", label: t('academicRequirements.options.citationStyle.Harvard') },
        { key: "IEEE", label: t('academicRequirements.options.citationStyle.IEEE') },
        { key: "Other", label: t('academicRequirements.options.citationStyle.Other') }
      ]
    },
    {
      category: t('academicRequirements.categories.requiredSources'),
      options: [
        { key: "Academic Journals", label: t('academicRequirements.options.requiredSources.Academic Journals') },
        { key: "Books", label: t('academicRequirements.options.requiredSources.Books') },
        { key: "Websites", label: t('academicRequirements.options.requiredSources.Websites') },
        { key: "Interviews", label: t('academicRequirements.options.requiredSources.Interviews') },
        { key: "Survey Data", label: t('academicRequirements.options.requiredSources.Survey Data') },
        { key: "Other", label: t('academicRequirements.options.requiredSources.Other') }
      ]
    },
    {
      category: t('academicRequirements.categories.formatRequirements'),
      options: [
        { key: "Research Paper", label: t('academicRequirements.options.formatRequirements.Research Paper') },
        { key: "Essay", label: t('academicRequirements.options.formatRequirements.Essay') },
        { key: "Case Study", label: t('academicRequirements.options.formatRequirements.Case Study') },
        { key: "Literature Review", label: t('academicRequirements.options.formatRequirements.Literature Review') },
        { key: "Presentation", label: t('academicRequirements.options.formatRequirements.Presentation') },
        { key: "Other", label: t('academicRequirements.options.formatRequirements.Other') }
      ]
    },
    {
      category: t('academicRequirements.categories.wordCount'),
      options: [
        { key: "500-1000", label: t('academicRequirements.options.wordCount.500-1000') },
        { key: "1000-2000", label: t('academicRequirements.options.wordCount.1000-2000') },
        { key: "2000-5000", label: t('academicRequirements.options.wordCount.2000-5000') },
        { key: "5000+", label: t('academicRequirements.options.wordCount.5000+') },
        { key: "Flexible", label: t('academicRequirements.options.wordCount.Flexible') }
      ]
    }
  ]

  const assignmentTypes = [
    {
      id: "programming",
      title: t('services.programming.title'),
      description: t('services.programming.description'),
      icon: Code2,
      examples: t.raw('services.programming.features'),
    },
    {
      id: "humanities",
      title: t('services.humanities.title'),
      description: t('services.humanities.description'),
      icon: MessageSquare,
      examples: t.raw('services.humanities.features'),
    },
    {
      id: "social_work",
      title: t('services.social_work.title'),
      description: t('services.social_work.description'),
      icon: Wrench,
      examples: t.raw('services.social_work.features'),
    },
    {
      id: "multidisciplinary",
      title: t('services.multidisciplinary.title'),
      description: t('services.multidisciplinary.description'),
      icon: Rocket,
      examples: t.raw('services.multidisciplinary.features'),
    },
  ]

  const deadlineOptions = [
    {
      id: "urgent-24h",
      label: t('timelineLevel.deadlines.urgent-24h.label'),
      description: t('timelineLevel.deadlines.urgent-24h.description')
    },
    {
      id: "urgent-3days",
      label: t('timelineLevel.deadlines.urgent-3days.label'),
      description: t('timelineLevel.deadlines.urgent-3days.description')
    },
    {
      id: "week",
      label: t('timelineLevel.deadlines.week.label'),
      description: t('timelineLevel.deadlines.week.description')
    },
    {
      id: "2-weeks",
      label: t('timelineLevel.deadlines.2-weeks.label'),
      description: t('timelineLevel.deadlines.2-weeks.description')
    },
    {
      id: "month",
      label: t('timelineLevel.deadlines.month.label'),
      description: t('timelineLevel.deadlines.month.description')
    },
    {
      id: "flexible",
      label: t('timelineLevel.deadlines.flexible.label'),
      description: t('timelineLevel.deadlines.flexible.description')
    }
  ]

  const academicLevelOptions = [
    {
      id: "high-school",
      label: t('timelineLevel.academicLevels.high-school.label'),
      description: t('timelineLevel.academicLevels.high-school.description')
    },
    {
      id: "undergraduate",
      label: t('timelineLevel.academicLevels.undergraduate.label'),
      description: t('timelineLevel.academicLevels.undergraduate.description')
    },
    {
      id: "graduate",
      label: t('timelineLevel.academicLevels.graduate.label'),
      description: t('timelineLevel.academicLevels.graduate.description')
    },
    {
      id: "phd",
      label: t('timelineLevel.academicLevels.phd.label'),
      description: t('timelineLevel.academicLevels.phd.description')
    },
    {
      id: "professional",
      label: t('timelineLevel.academicLevels.professional.label'),
      description: t('timelineLevel.academicLevels.professional.description')
    }
  ]

  const [formData, setFormData] = useState<FormData>({
    assignmentType: "",
    assignmentTitle: "",
    assignmentDescription: "",
    subjectArea: "",
    academicLevel: "",
    specificRequirements: "",
    hasExistingWork: "",
    citationStyle: "",
    academicExpertise: [],
    requiredSources: {},
    deadline: "",
    urgencyLevel: "",
    submissionDate: "",
    name: "",
    email: "",
    university: "",
    phone: "",
    preferredContact: "email",
    additionalNotes: "",
  })

  const updateFormData = (field: keyof FormData, value: FormData[keyof FormData]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleAcademicExpertise = (id: string) => {
    const current = formData.academicExpertise
    if (current.includes(id)) {
      updateFormData(
        "academicExpertise",
        current.filter((x) => x !== id),
      )
    } else {
      updateFormData("academicExpertise", [...current, id])
    }
  }

  const toggleSourceOption = (category: string, option: string) => {
    const current = formData.requiredSources[category] || []
    if (current.includes(option)) {
      updateFormData("requiredSources", {
        ...formData.requiredSources,
        [category]: current.filter((x) => x !== option),
      })
    } else {
      updateFormData("requiredSources", {
        ...formData.requiredSources,
        [category]: [...current, option],
      })
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.assignmentType !== ""
      case 2:
        return formData.assignmentTitle !== "" && formData.assignmentDescription !== ""
      case 3:
        return true
      case 4:
        return formData.deadline !== "" && formData.academicLevel !== ""
      case 5:
        return formData.name !== "" && formData.email !== ""
      default:
        return true
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/project-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit request")
      }

      toast.success("Request submitted!", {
        description: data.message || "We'll review your project and get back to you within 24 hours.",
      })

      setIsSubmitted(true)
    } catch (error) {
      toast.error("Failed to submit request", {
        description: error instanceof Error ? error.message : "Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  if (isSubmitted) {
    return (
      <section className="pt-32 pb-24 min-h-screen flex items-center">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
            <CheckCircle className="h-10 w-10 text-accent" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{t('success.title')}</h1>
          <p className="text-lg text-muted-foreground mb-8">
            {t('success.message')}
          </p>
          <div className="p-6 rounded-xl bg-card border border-border text-left space-y-4">
            <h3 className="font-semibold">{t('success.whatHappensNext')}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>{t('success.steps.review')}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>{t('success.steps.match')}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>{t('success.steps.timeline')}</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>{t('success.steps.begin')}</span>
              </li>
            </ul>
          </div>
          <Button asChild className="mt-8">
            <a href="/">{t('success.backToHomepage')}</a>
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="pt-32 pb-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-accent/3 blur-[100px] rounded-full" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium text-accent mb-3 tracking-wide uppercase">{t('badge')}</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {t('subtitle')}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                      currentStep > step.id
                        ? "bg-accent border-accent text-accent-foreground"
                        : currentStep === step.id
                          ? "border-accent text-accent bg-accent/10"
                          : "border-border text-muted-foreground",
                    )}
                  >
                    {currentStep > step.id ? <Check className="h-5 w-5" /> : <step.icon className="h-5 w-5" />}
                  </div>
                  <span
                    className={cn(
                      "mt-2 text-xs font-medium hidden sm:block",
                      currentStep >= step.id ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 w-8 sm:w-16 mx-2 transition-colors",
                      currentStep > step.id ? "bg-accent" : "bg-border",
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="border-border/50 bg-card/50 glass-effect">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Assignment Type */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{t('assignmentType.question')}</h2>
                    <p className="text-muted-foreground text-sm">{t('assignmentType.description')}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {assignmentTypes.map((assignment) => (
                      <button
                        key={assignment.id}
                        type="button"
                        onClick={() => updateFormData("assignmentType", assignment.id)}
                        className={cn(
                          "p-5 rounded-xl border text-left transition-all hover:border-accent/50",
                          formData.assignmentType === assignment.id
                            ? "border-accent bg-accent/5 ring-1 ring-accent"
                            : "border-border bg-background/50",
                        )}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                              formData.assignmentType === assignment.id
                                ? "bg-accent text-accent-foreground"
                                : "bg-secondary text-muted-foreground",
                            )}
                          >
                            <assignment.icon className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-medium">{assignment.title}</h3>
                            <p className="text-sm text-muted-foreground">{assignment.description}</p>
                            <div className="flex flex-wrap gap-1.5 pt-2">
                              {(assignment.examples as string[]).map((example: string) => (
                                <span
                                  key={example}
                                  className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground"
                                >
                                  {example}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Assignment Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{t('assignmentDetails.title')}</h2>
                    <p className="text-muted-foreground text-sm">
                      {t('assignmentDetails.subtitle')}
                    </p>
                  </div>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="assignmentTitle">{t('assignmentDetails.fields.assignmentTitle')}</Label>
                      <Input
                        id="assignmentTitle"
                        placeholder={t('assignmentDetails.placeholders.assignmentTitle')}
                        value={formData.assignmentTitle}
                        onChange={(e) => updateFormData("assignmentTitle", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assignmentDescription">{t('assignmentDetails.fields.assignmentDescription')}</Label>
                      <Textarea
                        id="assignmentDescription"
                        placeholder={t('assignmentDetails.placeholders.assignmentDescription')}
                        rows={4}
                        value={formData.assignmentDescription}
                        onChange={(e) => updateFormData("assignmentDescription", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subjectArea">{t('assignmentDetails.fields.subjectArea')}</Label>
                      <Input
                        id="subjectArea"
                        placeholder={t('assignmentDetails.placeholders.subjectArea')}
                        value={formData.subjectArea}
                        onChange={(e) => updateFormData("subjectArea", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specificRequirements">{t('assignmentDetails.fields.specificRequirements')}</Label>
                      <Textarea
                        id="specificRequirements"
                        placeholder={t('assignmentDetails.placeholders.specificRequirements')}
                        rows={3}
                        value={formData.specificRequirements}
                        onChange={(e) => updateFormData("specificRequirements", e.target.value)}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{t('assignmentDetails.fields.hasExistingWork')}</Label>
                        <div className="flex gap-3">
                          {[
                            { key: "yes", label: t('assignmentDetails.existingWorkOptions.yes') },
                            { key: "no", label: t('assignmentDetails.existingWorkOptions.no') },
                            { key: "partial", label: t('assignmentDetails.existingWorkOptions.partial') }
                          ].map((option) => (
                            <button
                              key={option.key}
                              type="button"
                              onClick={() => updateFormData("hasExistingWork", option.key)}
                              className={cn(
                                "px-4 py-2 rounded-lg border text-sm transition-all",
                                formData.hasExistingWork === option.key
                                  ? "border-accent bg-accent/10 text-accent"
                                  : "border-border hover:border-accent/50",
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>{t('assignmentDetails.fields.citationStyle')}</Label>
                        <Input
                          id="citationStyle"
                          placeholder={t('assignmentDetails.placeholders.citationStyle')}
                          value={formData.citationStyle}
                          onChange={(e) => updateFormData("citationStyle", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Academic Requirements */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{t('academicRequirements.title')}</h2>
                    <p className="text-muted-foreground text-sm">
                      {t('academicRequirements.subtitle')}
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label>{t('academicRequirements.expertiseQuestion')}</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {academicExpertise.map((academic) => (
                          <button
                            key={academic.id}
                            type="button"
                            onClick={() => toggleAcademicExpertise(academic.id)}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg border text-left text-sm transition-all",
                              formData.academicExpertise.includes(academic.id)
                                ? "border-accent bg-accent/10"
                                : "border-border hover:border-accent/50",
                            )}
                          >
                            <academic.icon
                              className={cn(
                                "h-4 w-4",
                                formData.academicExpertise.includes(academic.id) ? "text-accent" : "text-muted-foreground",
                              )}
                            />
                            <span>{academic.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>{t('academicRequirements.sourcesQuestion')}</Label>
                      {academicRequirements.map((requirement) => (
                        <div key={requirement.category} className="space-y-2">
                          <p className="text-sm text-muted-foreground">{requirement.category}</p>
                          <div className="flex flex-wrap gap-2">
                            {requirement.options.map((option) => (
                              <button
                                key={option.key}
                                type="button"
                                onClick={() => toggleSourceOption(requirement.category, option.key)}
                                className={cn(
                                  "px-3 py-1.5 rounded-full border text-sm transition-all",
                                  (formData.requiredSources[requirement.category] || []).includes(option.key)
                                    ? "border-accent bg-accent/10 text-accent"
                                    : "border-border hover:border-accent/50",
                                )}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Timeline & Academic Level */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{t('timelineLevel.title')}</h2>
                    <p className="text-muted-foreground text-sm">
                      {t('timelineLevel.subtitle')}
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        {t('timelineLevel.deadlineLabel')}
                      </Label>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {deadlineOptions.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => updateFormData("deadline", option.id)}
                            className={cn(
                              "p-4 rounded-lg border text-left transition-all",
                              formData.deadline === option.id
                                ? "border-accent bg-accent/10"
                                : "border-border hover:border-accent/50",
                            )}
                          >
                            <p className="font-medium">{option.label}</p>
                            <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        {t('timelineLevel.academicLevelLabel')}
                      </Label>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {academicLevelOptions.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => updateFormData("academicLevel", option.id)}
                            className={cn(
                              "p-4 rounded-lg border text-left transition-all",
                              formData.academicLevel === option.id
                                ? "border-accent bg-accent/10"
                                : "border-border hover:border-accent/50",
                            )}
                          >
                            <p className="font-medium">{option.label}</p>
                            <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="submissionDate">{t('timelineLevel.submissionDateLabel')}</Label>
                      <Input
                        id="submissionDate"
                        type="date"
                        value={formData.submissionDate}
                        onChange={(e) => updateFormData("submissionDate", e.target.value)}
                        className="w-full sm:w-auto"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Contact Info */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{t('contactInfo.title')}</h2>
                    <p className="text-muted-foreground text-sm">
                      {t('contactInfo.subtitle')}
                    </p>
                  </div>
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t('contactInfo.fields.name.label')}</Label>
                        <Input
                          id="name"
                          placeholder={t('contactInfo.fields.name.placeholder')}
                          value={formData.name}
                          onChange={(e) => updateFormData("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('contactInfo.fields.email.label')}</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder={t('contactInfo.fields.email.placeholder')}
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          required
                          pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                          title="Please enter a valid email address"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="university">{t('contactInfo.fields.university.label')}</Label>
                      <Input
                        id="university"
                        placeholder={t('contactInfo.fields.university.placeholder')}
                        value={formData.university}
                        onChange={(e) => updateFormData("university", e.target.value)}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t('contactInfo.fields.phone.label')}</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder={t('contactInfo.fields.phone.placeholder')}
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>{t('contactInfo.fields.preferredContact.label')}</Label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { key: "email", label: t('contactInfo.fields.preferredContact.options.email') },
                            { key: "phone", label: t('contactInfo.fields.preferredContact.options.phone') },
                            { key: "whatsapp", label: t('contactInfo.fields.preferredContact.options.whatsapp') },
                            { key: "either", label: t('contactInfo.fields.preferredContact.options.either') }
                          ].map((option) => (
                            <button
                              key={option.key}
                              type="button"
                              onClick={() => updateFormData("preferredContact", option.key)}
                              className={cn(
                                "px-4 py-2 rounded-lg border text-sm transition-all",
                                formData.preferredContact === option.key
                                  ? "border-accent bg-accent/10 text-accent"
                                  : "border-border hover:border-accent/50",
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="additionalNotes">{t('contactInfo.fields.additionalNotes.label')}</Label>
                      <Textarea
                        id="additionalNotes"
                        placeholder={t('contactInfo.fields.additionalNotes.placeholder')}
                        rows={3}
                        value={formData.additionalNotes}
                        onChange={(e) => updateFormData("additionalNotes", e.target.value)}
                      />
                    </div>
                    <div className="flex items-start gap-2 pt-2">
                      <Checkbox id="terms" required />
                      <Label htmlFor="terms" className="text-sm text-muted-foreground font-normal leading-snug">
                        I agree to be contacted regarding this assignment help request. We'll never share your information with
                        third parties. All work provided is for educational purposes only.
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <Button type="button" variant="ghost" onClick={prevStep} disabled={currentStep === 1}>
                  <ArrowLeft className="me-2 h-4 w-4 rtl:rotate-180" />
                  {t('navigation.previous')}
                </Button>
                {currentStep < 5 ? (
                  <Button type="button" onClick={nextStep} disabled={!canProceed()}>
                    {t('navigation.next')}
                    <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={!canProceed() || isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('navigation.submit')}
                      </>
                    ) : (
                      <>
                        {t('navigation.submit')}
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Trust indicators */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>{t('security.message')}</p>
          <p className="mt-1">{t('security.responseTime')}</p>
        </div>
      </div>
    </section>
  )
}
