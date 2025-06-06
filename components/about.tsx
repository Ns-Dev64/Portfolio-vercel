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
                  I'm a Computer Science Engineering student and fullstack developer with a strong passion for backend
                  development. My journey in tech has been focused on building robust, scalable applications and solving
                  complex technical challenges. Through my internships at Techplement and DeepThought Edutech, I've
                  gained hands-on experience in developing high-performance systems and EdTech solutions.
                </p>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  While I enjoy working across the full stack, I'm particularly drawn to backend architecture, API
                  development, and performance optimization. I have experience with modern technologies like Bun.js,
                  Node.js, and various databases, always focusing on creating efficient and maintainable solutions.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, gaming, working out or pursuing my
                  hobbies that keep me creative and inspired.
                </p>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4 text-primary">Quick Facts</h4>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center space-x-2 hover:text-primary transition-colors duration-200">
                      <span>🎓</span>
                      <span>BTech Computer Science Graduate</span>
                    </li>
                    <li className="flex items-center space-x-2 hover:text-primary transition-colors duration-200">
                      <span>💼</span>
                      <span>Fullstack Developer with Backend Focus</span>
                    </li>
                    <li className="flex items-center space-x-2 hover:text-primary transition-colors duration-200">
                      <span>🔧</span>
                      <span>Obsessed with scalable systems and clean architecture</span>
                    </li>
                    <li className="flex items-center space-x-2 hover:text-primary transition-colors duration-200">
                      <span>🌱</span>
                      <span>Tech tinkerer at heart </span>
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
