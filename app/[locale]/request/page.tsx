import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProjectRequestForm } from "@/components/project-request-form"

export const metadata = {
  title: "Get Assignment Help | Academic Assist Pro",
  description: "Tell us about your assignment and get matched with an academic expert within 24 hours.",
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
