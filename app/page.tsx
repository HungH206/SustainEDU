import { Hero } from "../components/hero"
import { Features } from "../components/features"
import { HowItWorks } from "../components/how-it-works"
import { CTA } from "../components/cta"
import { Navigation } from "../components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
    </main>
  )
}
