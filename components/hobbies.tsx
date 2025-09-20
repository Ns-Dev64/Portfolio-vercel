"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Music, Gamepad2, Book } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function Hobbies() {
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

  const hobbies = [
    {
      icon: Book,
      title: "Tech Learning",
      description:
        "Constantly learning about system design, database optimization, and new backend frameworks through documentation and courses.",
    },
    {
      icon: Gamepad2,
      title: "Problem Solving",
      description: "Enjoy learning new algorithms, not that cool with leetcode type stuff.",
    },
    {
      icon: Music,
      title: "Music",
      description: "Listening to music while coding helps maintain focus during long development sessions.",
    },
  ]

  return (
    <section ref={ref} id="hobbies" className="section-padding bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`text-responsive-lg font-bold mb-4 transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Hobbies & Interests
          </h2>
          <div className="divider" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {hobbies.map((hobby, index) => (
            <Card
              key={index}
              className={`card-minimal hover-scale text-center transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8">
                <hobby.icon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-3">{hobby.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{hobby.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
