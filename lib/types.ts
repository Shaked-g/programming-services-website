export interface ContactSubmission {
  name: string
  email: string
  company?: string
  service: string
  message: string
  submittedAt: Date
}

export interface ProjectRequestSubmission {
  serviceType: string
  projectTitle: string
  projectDescription: string
  currentState?: string
  desiredOutcome?: string
  hasExistingCode?: string
  repoAccess?: string
  techExpertise: string[]
  currentStack: Record<string, string[]>
  timeline: string
  budget: string
  startDate?: string
  name: string
  email: string
  company?: string
  role?: string
  phone?: string
  preferredContact: string
  additionalNotes?: string
  submittedAt: Date
}
