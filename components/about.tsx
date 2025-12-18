"use client"
import { useEffect, useRef, useState } from "react"

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} id="about" className="section-robotic">
      <div className="max-w-4xl mx-auto">
        <h2
          className={`title-robotic text-responsive-lg mb-12 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          About Me
        </h2>
        <div
          className={`card-robotic p-8 hover-lift transition-all duration-700 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-lg font-bold uppercase tracking-wide mb-4">My Journey</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                Backend Engineer at MUST Fintech with a proven track record of building scalable AI-powered systems. I
                specialize in FastAPI, Node.js, and cloud architectures, with expertise in real-time transcription,
                multi-company platforms, and LLM integration.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                My recent work includes architecting an AI-powered transcription platform that increased client
                retention by 25%, developing super admin portals that reduced management overhead by 40%, and
                implementing comprehensive testing frameworks that cut bug reports by 30%.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                I'm passionate about building systems that scale, optimizing performance, and leveraging AI to solve
                real-world business problems. From Seoul to Hospet, I've collaborated with cross-functional teams to
                deliver impactful solutions.
              </p>
            </div>
            <div className="space-y-4">
              <div className="card-robotic p-6 bg-muted/30 border-2">
                <h4 className="font-bold mb-4 uppercase tracking-wide text-xs">Areas of Expertise</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm hover:text-foreground transition-all duration-200 group">
                    <span className="w-1.5 h-1.5 bg-foreground flex-shrink-0 transition-all duration-300 group-hover:scale-150"></span>
                    <span>AI-Powered Backend Systems</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm hover:text-foreground transition-all duration-200 group">
                    <span className="w-1.5 h-1.5 bg-foreground flex-shrink-0 transition-all duration-300 group-hover:scale-150"></span>
                    <span>Real-Time Transcription & Translation</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm hover:text-foreground transition-all duration-200 group">
                    <span className="w-1.5 h-1.5 bg-foreground flex-shrink-0 transition-all duration-300 group-hover:scale-150"></span>
                    <span>Multi-Company Architecture</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm hover:text-foreground transition-all duration-200 group">
                    <span className="w-1.5 h-1.5 bg-foreground flex-shrink-0 transition-all duration-300 group-hover:scale-150"></span>
                    <span>RESTful API & Microservices</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm hover:text-foreground transition-all duration-200 group">
                    <span className="w-1.5 h-1.5 bg-foreground flex-shrink-0 transition-all duration-300 group-hover:scale-150"></span>
                    <span>Cloud Infrastructure & DevOps</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
