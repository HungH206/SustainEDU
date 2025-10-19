import { Card } from "./ui/card"

const steps = [
  {
    number: "01",
    title: "Capture",
    description:
      "Take a photo of your handwritten notes, equations, or textbook pages. Our AI instantly digitizes and organizes your content.",
    image: "/student-taking-photo-of-handwritten-notes.jpg",
  },
  {
    number: "02",
    title: "Understand",
    description:
      "Ask questions and get AI-powered explanations. Receive smart summaries and concept breakdowns tailored to your learning style.",
    image: "/ai-explaining-concepts-with-diagrams.jpg",
  },
  {
    number: "03",
    title: "Retain",
    description:
      "Listen to audio narrations of your materials. Review through spaced repetition sessions that optimize long-term memory.",
    image: "/student-listening-to-audio-with-headphones.jpg",
  },
  {
    number: "04",
    title: "Sustain",
    description:
      "Build lasting knowledge with AI-curated refresh sessions. Track your progress and watch your understanding grow over time.",
    image: "/progress-dashboard-with-learning-analytics.jpg",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How SustainEdu Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to transform how you learn and retain knowledge
          </p>
        </div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <Card key={index} className={`overflow-hidden ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              <div className="lg:flex items-center">
                <div className="lg:w-1/2 p-8 lg:p-12">
                  <div className="text-5xl font-bold text-primary/20 mb-4">{step.number}</div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">{step.description}</p>
                </div>
                <div className="lg:w-1/2 bg-muted/50 min-h-[300px] flex items-center justify-center">
                  <img src={step.image || "/placeholder.svg"} alt={step.title} className="w-full h-full object-cover" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
