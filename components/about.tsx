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
                  I'm a fullstack developer with a strong passion for backend development. My journey began with
                  learning the fundamentals of web development, but I quickly gravitated towards server-side
                  architecture, API design, and database optimization.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  While I'm comfortable with frontend technologies like React and Next.js, my true expertise lies in
                  building robust backend systems. Through internships at Techplement and DeepThought, I've specialized
                  in Node.js, Express.js, and performance optimization, achieving significant improvements in system
                  efficiency and user experience.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  I love solving complex backend challenges, from designing scalable APIs to optimizing database queries
                  and implementing efficient caching strategies.
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4 text-primary">Development Focus</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm hover:text-foreground transition-colors duration-200">
                      <span className="w-2 h-2 bg-foreground flex-shrink-0"></span>
                      <span>Backend Architecture & APIs</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm hover:text-foreground transition-colors duration-200">
                      <span className="w-2 h-2 bg-foreground flex-shrink-0"></span>
                      <span>Performance Optimization</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm hover:text-foreground transition-colors duration-200">
                      <span className="w-2 h-2 bg-foreground flex-shrink-0"></span>
                      <span>Database Design & Optimization</span>
                    </li>
                    <li className="flex items-center gap-3 text-sm hover:text-foreground transition-colors duration-200">
                      <span className="w-2 h-2 bg-foreground flex-shrink-0"></span>
                      <span>Frontend Development (React/Next.js)</span>
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
