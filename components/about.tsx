"use client"

import { Card, CardContent } from "@/components/ui/card"
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
    <section ref={ref} id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-3xl font-bold text-center mb-12 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          About Me
        </h2>
        <Card
          className={`hover:shadow-lg transition-all duration-500 hover:scale-[1.02] ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">My Journey</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Backend Engineer at MUST Fintech with a proven track record of building scalable AI-powered systems. I
                  specialize in FastAPI, Node.js, and cloud architectures, with expertise in real-time transcription,
                  multi-company platforms, and LLM integration.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  My recent work includes architecting an AI-powered transcription platform that increased client
                  retention by 25%, developing super admin portals that reduced management overhead by 40%, and
                  implementing comprehensive testing frameworks that cut bug reports by 30%.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I'm passionate about building systems that scale, optimizing performance, and leveraging AI to solve
                  real-world business problems. From Seoul to Hospet, I've collaborated with cross-functional teams to
                  deliver impactful solutions.
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4 text-primary">Areas of Expertise</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm hover:text-foreground transition-colors duration-200">
                      <span className="w-2 h-2 bg-foreground flex-shrink-0"></span>
                      <span>AI-Powered Backend Systems</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm hover:text-foreground transition-colors duration-200">
                      <span className="w-2 h-2 bg-foreground flex-shrink-0"></span>
                      <span>Real-Time Transcription & Translation</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm hover:text-foreground transition-colors duration-200">
                      <span className="w-2 h-2 bg-foreground flex-shrink-0"></span>
                      <span>Multi-Company Architecture</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm hover:text-foreground transition-colors duration-200">
                      <span className="w-2 h-2 bg-foreground flex-shrink-0"></span>
                      <span>RESTful API & Microservices</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm hover:text-foreground transition-colors duration-200">
                      <span className="w-2 h-2 bg-foreground flex-shrink-0"></span>
                      <span>Cloud Infrastructure & DevOps</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
