"use client"
import { useEffect, useRef, useState } from "react"
import type React from "react"

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
    <section ref={ref} id="skills" className="section-robotic">
      <div className="max-w-6xl mx-auto">
        <h2 className="title-robotic text-responsive-lg mb-12">Skills & Technologies</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className={`card-robotic p-8 transition-all duration-700 stagger-item hover-lift ${
                isVisible ? "in-view" : ""
              }`}
              style={
                {
                  animationDelay: `${index * 100}ms`,
                  "--index": index,
                } as React.CSSProperties
              }
            >
              <h3 className="text-xs font-bold uppercase tracking-widest mb-4 text-foreground border-b border-border pb-3">
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 group"
                    style={{ animationDelay: `${index * 100 + skillIndex * 50}ms` }}
                  >
                    <span className="w-1.5 h-1.5 bg-foreground flex-shrink-0 transition-all duration-300 group-hover:scale-150"></span>
                    <span className="text-sm text-muted-foreground font-medium transition-colors duration-300 group-hover:text-foreground">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
