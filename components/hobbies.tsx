"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Camera, Music, Gamepad2, Book, Plane, Code } from "lucide-react"
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
      icon: Code,
      title: "Open Source",
      description:
        "Contributing to open source projects and exploring cutting-edge technologies like Bun.js and performance optimization.",
    },
    {
      icon: Book,
      title: "Tech Learning",
      description:
        "Constantly learning about system design, database optimization, and new backend frameworks through documentation and courses.",
    },
    {
      icon: Gamepad2,
      title: "Problem Solving",
      description: "Enjoy learning new alogrithms, not that cool with leetcode typa stuff.",
    },
    {
      icon: Camera,
      title: "AI & Computer Vision",
      description: "Exploring machine learning and computer vision projects, like the ALPR system using YOLOv8.",
    },
    {
      icon: Music,
      title: "Music",
      description: "Listening to music while coding helps maintain focus during long development sessions.",
    },
    {
      icon: Plane,
      title: "Tech Communities",
      description:
        "Participating in tech meetups and online communities to stay updated with industry trends and network with fellow developers.",
    },
  ]

  return (
    <section ref={ref} id="hobbies" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-3xl font-bold text-center mb-12 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Hobbies & Interests
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hobbies.map((hobby, index) => (
            <Card
              key={index}
              className={`text-center hover:shadow-lg transition-all duration-500 hover:scale-[1.05] group ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6">
                <hobby.icon className="h-12 w-12 mx-auto mb-4 text-primary group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
                  {hobby.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{hobby.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
