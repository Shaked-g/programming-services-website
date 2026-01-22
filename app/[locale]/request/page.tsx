import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProjectRequestForm } from "@/components/project-request-form"

export const metadata = {
  title: "Submit a Project Request | CodeCraft Labs",
  description: "Tell us about your project and get a tailored proposal within 24 hours.",
}

export default function RequestPage() {
  return (
    <main className="relative min-h-screen">
      <Header />
      <ProjectRequestForm />
      <Footer />
    </main>
  )
}
