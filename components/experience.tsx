"use client"

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
      title: "Backend Engineer Intern",
      company: "MUST Fintech",
      location: "Remote, Seoul",
      duration: "Aug 2025 - Ongoing",
      description:
        "Developed backend features for a B2B SaaS productivity platform using Express, TypeScript, Sequelize, and PostgreSQL, improving system stability and reducing feature delivery time by 30%. Built comprehensive testing framework using Jest (ts-jest), expanding automated test coverage to 60%.",
      technologies: ["Express.js", "TypeScript", "Sequelize", "PostgreSQL", "Jest", "OAuth"],
    },
    {
      title: "Backend Developer Intern",
      company: "DeepThought Edutech Ventures",
      location: "Remote, India",
      duration: "Sep 2024 - Dec 2024",
      description:
        "Led cross-functional collaboration across 3+ teams to integrate NodeBB and Smarty templating, enhancing product satisfaction for 500+ students. Automated student personality form workflow, processing 30,000+ entries using CSV, HTML, CSS, jQuery, and Node.js.",
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
    <section ref={ref} id="experience" className="section-robotic bg-muted/10">
      <div className="max-w-4xl mx-auto">
        <h2 className="title-robotic text-responsive-lg mb-12">Experience</h2>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`card-robotic p-8 transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold mb-2">{exp.title}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground text-sm">
                    <span className="font-medium">{exp.company}</span>
                    <span className="hidden sm:inline">•</span>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {exp.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  {exp.duration}
                </div>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed text-sm">{exp.description}</p>

              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="badge-robotic">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
