"use client"
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
    <section ref={ref} id="hobbies" className="section-robotic bg-muted/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`title-robotic text-responsive-lg mb-4 transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Hobbies & Interests
          </h2>
          <div className="divider-robotic" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {hobbies.map((hobby, index) => (
            <div
              key={index}
              className={`card-robotic p-8 text-center hover-lift transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="mb-6 inline-block transition-all duration-300 hover:scale-125 hover:rotate-6">
                <hobby.icon className="h-12 w-12 text-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-bold uppercase tracking-wide mb-3">{hobby.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{hobby.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
