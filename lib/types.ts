export interface ContactSubmission {
  name: string
  email: string
  subject: string
  service: string
  deadline: string
  academicLevel: string
  message: string
  submittedAt: Date
}

export interface AssignmentRequestSubmission {
  assignmentType: string
  assignmentTitle: string
  assignmentDescription: string
  subjectArea: string
  academicLevel: string
  specificRequirements: string
  hasExistingWork?: string
  citationStyle: string
  academicExpertise: string[]
  requiredSources: Record<string, string[]>
  deadline: string
  urgencyLevel: string
  submissionDate?: string
  name: string
  email: string
  university?: string
  phone?: string
  preferredContact: string
  additionalNotes?: string
  submittedAt: Date
}
