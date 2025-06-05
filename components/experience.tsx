"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function Experience() {
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

  const experiences = [
    {
      title: "Backend Developer Intern",
      company: "DeepThought",
      location: "Remote, India",
      duration: "Sep 2024 - Dec 2024",
      description:
        "Led cross-functional collaboration between 3+ teams, enhancing product satisfaction for 500+ students. Engineered backend architecture and APIs for an EdTech SaaS application, reducing client onboarding time by 15% and boosting satisfaction ratings by 12%.",
      technologies: ["Node.js", "Express.js", "MongoDB", "NodeBB", "Smarty", "jQuery", "CSV Processing"],
    },
    {
      title: "Full Stack Developer Intern",
      company: "Techplement",
      location: "Remote, India",
      duration: "Aug 2024 - Sep 2024",
      description:
        "Led development of a comprehensive MERN stack web application with 50+ positive feedback responses. Orchestrated transition to generic API calls, reducing frontend memory consumption by 35% and network resource utilization by 20%.",
      technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Ngrok", "Postman", "CORS"],
    },
  ]

  return (
    <section ref={ref} id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-3xl font-bold text-center mb-12 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Experience
        </h2>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className={`hover:shadow-lg transition-all duration-500 hover:scale-[1.02] group ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <CardHeader className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-200">
                      {exp.title}
                    </CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-4 w-4" />
                      {exp.duration}
                    </div>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <span className="font-semibold">{exp.company}</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {exp.location}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                      style={{ animationDelay: `${techIndex * 100}ms` }}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
