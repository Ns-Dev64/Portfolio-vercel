"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"

export function Skills() {
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

  const skillCategories = [
    {
      title: "Languages",
      skills: ["JavaScript (ES6+)", "TypeScript", "Python"],
    },
    {
      title: "Frontend",
      skills: ["React.js", "Next.js", "jQuery", "Tailwind CSS"],
    },
    {
      title: "Backend",
      skills: ["Node.js", "Bun.js", "Express.js", "FastAPI", "Django", "Flask", "Elysia.js", "Hono.js"],
    },
    {
      title: "Databases",
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "SQLite", "PineconeDB"],
    },
    {
      title: "Architecture",
      skills: ["RESTful API", "WebSocket", "Microservices", "Queue Systems", "Bull MQ"],
    },
    {
      title: "Testing & Tools",
      skills: ["Jest", "Postman", "ThunderClient", "Git", "GitHub", "Prisma", "Sequelize", "Swagger"],
    },
    {
      title: "Cloud & DevOps",
      skills: ["AWS", "Docker", "NGINX", "Render", "Vercel", "Netlify", "PM2"],
    },
    {
      title: "AI & Specialized",
      skills: ["LangChain", "HuggingFace", "Gemini API", "OpenCV", "YOLOv8", "ffmpeg", "Mermaid.js"],
    },
  ]

  return (
    <section ref={ref} id="skills" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`text-responsive-lg font-bold mb-4 transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Skills & Technologies
          </h2>
          <div className="divider" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className={`card-minimal hover-scale transition-all duration-700 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span key={skill} className="badge-minimal text-xs">
                      {skill}
                    </span>
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
