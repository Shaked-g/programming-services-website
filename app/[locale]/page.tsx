import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Expertise } from "@/components/expertise"
import { Process } from "@/components/process"
import { Testimonials } from "@/components/testimonials"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative" dir="auto">
      <Header />
      <Hero />
      <Services />
      <Expertise />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
