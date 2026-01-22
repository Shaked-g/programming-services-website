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

const steps = [
  { id: 1, name: "Service Type", icon: Sparkles },
  { id: 2, name: "Project Details", icon: FileText },
  { id: 3, name: "Technical Info", icon: Code2 },
  { id: 4, name: "Timeline & Budget", icon: Clock },
  { id: 5, name: "Contact Info", icon: Send },
]

const serviceTypes = [
  {
    id: "codebase-fix",
    title: "Codebase Fixes & Optimization",
    description: "Bug fixes, performance optimization, code refactoring, security patches",
    icon: Wrench,
    examples: ["Fix critical bugs", "Improve performance", "Refactor legacy code", "Security audit"],
  },
  {
    id: "demo-to-production",
    title: "Demo to Production",
    description: "Scale your prototype or MVP into a production-ready application",
    icon: Rocket,
    examples: ["Architecture scaling", "Infrastructure setup", "CI/CD pipelines", "Testing coverage"],
  },
  {
    id: "consulting",
    title: "Technical Consulting",
    description: "Expert advice on architecture, technology choices, and best practices",
    icon: MessageSquare,
    examples: ["Architecture review", "Tech stack selection", "Team augmentation", "Code review"],
  },
  {
    id: "full-development",
    title: "Full Development",
    description: "End-to-end development from concept to deployment",
    icon: Code2,
    examples: ["Web applications", "Mobile apps", "APIs & backends", "AI integrations"],
  },
]

const techExpertise = [
  { id: "ai-ml", label: "AI & Machine Learning", icon: Brain },
  { id: "fullstack", label: "Full-Stack Development", icon: Server },
  { id: "cloud", label: "Cloud & DevOps", icon: Cloud },
  { id: "data", label: "Data Engineering", icon: Database },
  { id: "security", label: "Security", icon: Shield },
  { id: "performance", label: "Performance", icon: Zap },
]

const techStacks = [
  { category: "Frontend", options: ["React", "Next.js", "Vue", "Angular", "Svelte", "Other"] },
  { category: "Backend", options: ["Node.js", "Python", "Go", "Java", ".NET", "Other"] },
  { category: "Database", options: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Supabase", "Other"] },
  { category: "Cloud", options: ["AWS", "Vercel", "GCP", "Azure", "DigitalOcean", "Other"] },
]

const timelineOptions = [
  { id: "asap", label: "ASAP", description: "Need it done immediately" },
  { id: "1-2-weeks", label: "1-2 Weeks", description: "Short-term project" },
  { id: "1-month", label: "1 Month", description: "Medium timeline" },
  { id: "2-3-months", label: "2-3 Months", description: "Standard project" },
  { id: "3-6-months", label: "3-6 Months", description: "Large project" },
  { id: "flexible", label: "Flexible", description: "No hard deadline" },
]

const budgetRanges = [
  { id: "under-1k", label: "Under $1,000", description: "Quick fixes or small tasks" },
  { id: "1k-5k", label: "$1,000 - $5,000", description: "Small fixes or consulting" },
  { id: "5k-15k", label: "$5,000 - $15,000", description: "Feature development" },
  { id: "15k-50k", label: "$15,000 - $50,000", description: "Full project" },
  { id: "50k-100k", label: "$50,000 - $100,000", description: "Large application" },
  { id: "100k-plus", label: "$100,000+", description: "Enterprise solution" },
  { id: "discuss", label: "Let's Discuss", description: "Need guidance on budget" },
]

type FormData = {
  serviceType: string
  projectTitle: string
  projectDescription: string
  currentState: string
  desiredOutcome: string
  hasExistingCode: string
  repoAccess: string
  techExpertise: string[]
  currentStack: Record<string, string[]>
  timeline: string
  budget: string
  startDate: string
  name: string
  email: string
  company: string
  role: string
  phone: string
  preferredContact: string
  additionalNotes: string
}

export function ProjectRequestForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    serviceType: "",
    projectTitle: "",
    projectDescription: "",
    currentState: "",
    desiredOutcome: "",
    hasExistingCode: "",
    repoAccess: "",
    techExpertise: [],
    currentStack: {},
    timeline: "",
    budget: "",
    startDate: "",
    name: "",
    email: "",
    company: "",
    role: "",
    phone: "",
    preferredContact: "email",
    additionalNotes: "",
  })

  const updateFormData = (field: keyof FormData, value: FormData[keyof FormData]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleTechExpertise = (id: string) => {
    const current = formData.techExpertise
    if (current.includes(id)) {
      updateFormData(
        "techExpertise",
        current.filter((x) => x !== id),
      )
    } else {
      updateFormData("techExpertise", [...current, id])
    }
  }

  const toggleStackOption = (category: string, option: string) => {
    const current = formData.currentStack[category] || []
    if (current.includes(option)) {
      updateFormData("currentStack", {
        ...formData.currentStack,
        [category]: current.filter((x) => x !== option),
      })
    } else {
      updateFormData("currentStack", {
        ...formData.currentStack,
        [category]: [...current, option],
      })
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.serviceType !== ""
      case 2:
        return formData.projectTitle !== "" && formData.projectDescription !== ""
      case 3:
        return true
      case 4:
        return formData.timeline !== "" && formData.budget !== ""
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
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Request Submitted!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for your detailed project submission. Our team will review your requirements and get back to you
            within 24 hours with a tailored proposal.
          </p>
          <div className="p-6 rounded-xl bg-card border border-border text-left space-y-4">
            <h3 className="font-semibold">What happens next?</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>Our team reviews your project details and requirements</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>We prepare a customized proposal with timeline and pricing</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>Schedule a brief call to finalize details (optional)</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span>Begin work as soon as you approve the proposal</span>
              </li>
            </ul>
          </div>
          <Button asChild className="mt-8">
            <a href="/">Back to Homepage</a>
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
          <p className="text-sm font-medium text-accent mb-3 tracking-wide uppercase">Project Request</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
            Tell us about your project
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Complete this form and we'll provide a tailored proposal within 24 hours. The more detail you provide, the
            more accurate our estimate.
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
              {/* Step 1: Service Type */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">What type of service do you need?</h2>
                    <p className="text-muted-foreground text-sm">Select the option that best describes your project</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {serviceTypes.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => updateFormData("serviceType", service.id)}
                        className={cn(
                          "p-5 rounded-xl border text-left transition-all hover:border-accent/50",
                          formData.serviceType === service.id
                            ? "border-accent bg-accent/5 ring-1 ring-accent"
                            : "border-border bg-background/50",
                        )}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                              formData.serviceType === service.id
                                ? "bg-accent text-accent-foreground"
                                : "bg-secondary text-muted-foreground",
                            )}
                          >
                            <service.icon className="h-5 w-5" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-medium">{service.title}</h3>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                            <div className="flex flex-wrap gap-1.5 pt-2">
                              {service.examples.map((example) => (
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

              {/* Step 2: Project Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Tell us about your project</h2>
                    <p className="text-muted-foreground text-sm">
                      The more detail you provide, the better we can understand your needs
                    </p>
                  </div>
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="projectTitle">Project Title *</Label>
                      <Input
                        id="projectTitle"
                        placeholder="e.g., E-commerce Platform Optimization"
                        value={formData.projectTitle}
                        onChange={(e) => updateFormData("projectTitle", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="projectDescription">Project Description *</Label>
                      <Textarea
                        id="projectDescription"
                        placeholder="Describe your project, its purpose, and what you're trying to achieve..."
                        rows={4}
                        value={formData.projectDescription}
                        onChange={(e) => updateFormData("projectDescription", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentState">Current State</Label>
                      <Textarea
                        id="currentState"
                        placeholder="What's the current state of the project? Is it a new idea, existing code, or live product?"
                        rows={3}
                        value={formData.currentState}
                        onChange={(e) => updateFormData("currentState", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="desiredOutcome">Desired Outcome</Label>
                      <Textarea
                        id="desiredOutcome"
                        placeholder="What does success look like? What specific goals do you want to achieve?"
                        rows={3}
                        value={formData.desiredOutcome}
                        onChange={(e) => updateFormData("desiredOutcome", e.target.value)}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Do you have existing code?</Label>
                        <div className="flex gap-3">
                          {["Yes", "No", "Partial"].map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => updateFormData("hasExistingCode", option.toLowerCase())}
                              className={cn(
                                "px-4 py-2 rounded-lg border text-sm transition-all",
                                formData.hasExistingCode === option.toLowerCase()
                                  ? "border-accent bg-accent/10 text-accent"
                                  : "border-border hover:border-accent/50",
                              )}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Can we access the repo?</Label>
                        <div className="flex gap-3">
                          {["Yes", "After NDA", "No"].map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => updateFormData("repoAccess", option.toLowerCase().replace(" ", "-"))}
                              className={cn(
                                "px-4 py-2 rounded-lg border text-sm transition-all",
                                formData.repoAccess === option.toLowerCase().replace(" ", "-")
                                  ? "border-accent bg-accent/10 text-accent"
                                  : "border-border hover:border-accent/50",
                              )}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Technical Info */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Technical Requirements</h2>
                    <p className="text-muted-foreground text-sm">
                      Help us understand the technical scope of your project
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label>What expertise do you need? (Select all that apply)</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {techExpertise.map((tech) => (
                          <button
                            key={tech.id}
                            type="button"
                            onClick={() => toggleTechExpertise(tech.id)}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-lg border text-left text-sm transition-all",
                              formData.techExpertise.includes(tech.id)
                                ? "border-accent bg-accent/10"
                                : "border-border hover:border-accent/50",
                            )}
                          >
                            <tech.icon
                              className={cn(
                                "h-4 w-4",
                                formData.techExpertise.includes(tech.id) ? "text-accent" : "text-muted-foreground",
                              )}
                            />
                            <span>{tech.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Current or Preferred Tech Stack (if applicable)</Label>
                      {techStacks.map((stack) => (
                        <div key={stack.category} className="space-y-2">
                          <p className="text-sm text-muted-foreground">{stack.category}</p>
                          <div className="flex flex-wrap gap-2">
                            {stack.options.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => toggleStackOption(stack.category, option)}
                                className={cn(
                                  "px-3 py-1.5 rounded-full border text-sm transition-all",
                                  (formData.currentStack[stack.category] || []).includes(option)
                                    ? "border-accent bg-accent/10 text-accent"
                                    : "border-border hover:border-accent/50",
                                )}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Timeline & Budget */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-2">Timeline & Budget</h2>
                    <p className="text-muted-foreground text-sm">
                      Help us understand your constraints so we can provide an accurate proposal
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <Label className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        Desired Timeline *
                      </Label>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {timelineOptions.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => updateFormData("timeline", option.id)}
                            className={cn(
                              "p-4 rounded-lg border text-left transition-all",
                              formData.timeline === option.id
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
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        Budget Range *
                      </Label>
                      <div className="grid sm:grid-cols-3 gap-3">
                        {budgetRanges.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => updateFormData("budget", option.id)}
                            className={cn(
                              "p-4 rounded-lg border text-left transition-all",
                              formData.budget === option.id
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
                      <Label htmlFor="startDate">Preferred Start Date</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => updateFormData("startDate", e.target.value)}
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
                    <h2 className="text-xl font-semibold mb-2">Your Contact Information</h2>
                    <p className="text-muted-foreground text-sm">
                      We'll use this to send you our proposal and follow up
                    </p>
                  </div>
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => updateFormData("name", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          required
                          pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                          title="Please enter a valid email address"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input
                          id="company"
                          placeholder="Acme Inc."
                          value={formData.company}
                          onChange={(e) => updateFormData("company", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Your Role</Label>
                        <Input
                          id="role"
                          placeholder="CTO, Founder, etc."
                          value={formData.role}
                          onChange={(e) => updateFormData("role", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => updateFormData("phone", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Preferred Contact Method</Label>
                        <div className="flex gap-3">
                          {["Email", "Phone", "Either"].map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => updateFormData("preferredContact", option.toLowerCase())}
                              className={cn(
                                "px-4 py-2 rounded-lg border text-sm transition-all",
                                formData.preferredContact === option.toLowerCase()
                                  ? "border-accent bg-accent/10 text-accent"
                                  : "border-border hover:border-accent/50",
                              )}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="additionalNotes">Anything else we should know?</Label>
                      <Textarea
                        id="additionalNotes"
                        placeholder="Any additional context, requirements, or questions..."
                        rows={3}
                        value={formData.additionalNotes}
                        onChange={(e) => updateFormData("additionalNotes", e.target.value)}
                      />
                    </div>
                    <div className="flex items-start gap-2 pt-2">
                      <Checkbox id="terms" required />
                      <Label htmlFor="terms" className="text-sm text-muted-foreground font-normal leading-snug">
                        I agree to be contacted regarding this project request. We'll never share your information with
                        third parties.
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <Button type="button" variant="ghost" onClick={prevStep} disabled={currentStep === 1}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                {currentStep < 5 ? (
                  <Button type="button" onClick={nextStep} disabled={!canProceed()}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={!canProceed() || isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Request
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
          <p>Your information is secure and will only be used to prepare your proposal.</p>
          <p className="mt-1">Average response time: less than 24 hours</p>
        </div>
      </div>
    </section>
  )
}
