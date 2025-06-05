import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { Hobbies } from "@/components/hobbies"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { BackgroundAnimation } from "@/components/background-animation"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"

export default function Portfolio() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-background relative">
        <BackgroundAnimation />
        <div className="relative z-10">
          <Header />
          <main>
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Hobbies />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </SmoothScrollProvider>
  )
}
