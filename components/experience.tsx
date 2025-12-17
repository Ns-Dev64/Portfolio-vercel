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
      title: "Backend Engineer",
      company: "MUST Fintech",
      location: "Remote, Seoul, South Korea",
      duration: "Nov 2025 - Present",
      description:
        "Enhanced AI-powered B2B/B2C transcription and translation platform using FastAPI, DynamoDB, and boto3, implementing Scribe v2 real-time transcription that improved user experience and enabled seamless client demonstrations, increasing client retention by 25%. Architected and led development of super admin management portal with full CRUD operations for rooms, users, and multi-company hierarchies, streamlining administrative workflows and reducing management overhead by 40%.",
      technologies: ["FastAPI", "DynamoDB", "boto3", "ElevenLabs", "Gemini 2.5 Pro", "WebSocket"],
    },
    {
      title: "Backend Engineer Intern",
      company: "MUST Fintech",
      location: "Remote, Seoul, South Korea",
      duration: "Aug 2025 - Nov 2025",
      description:
        "Developed backend features for a B2B SaaS employee productivity platform using Express, TypeScript, Sequelize, and PostgreSQL, implementing data aggregation dashboards that increased employee productivity insights and operational transparency by 35%. Built comprehensive testing framework with Jest (ts-jest), achieving 60% automated test coverage and reducing bug reports by 30% across backend services.",
      technologies: ["Express.js", "TypeScript", "Sequelize", "PostgreSQL", "Jest", "ts-jest"],
    },
    {
      title: "Backend Developer Intern",
      company: "DeepThought Edutech Ventures Private Limited",
      location: "Remote, India",
      duration: "Sep 2024 - Dec 2024",
      description:
        "Led cross-functional collaboration across 3+ teams to integrate NodeBB forum platform and Smarty templating engine, enhancing product satisfaction for 500+ students and reducing implementation timeline by 20%. Automated student personality assessment workflow processing 30,000+ entries using CSV parsing, HTML forms, jQuery validation, and Node.js backend, reducing manual data processing time from 40 hours to under 2 hours per batch.",
      technologies: ["Node.js", "Express.js", "NodeBB", "Smarty", "jQuery", "CSV Processing", "RESTful API"],
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
