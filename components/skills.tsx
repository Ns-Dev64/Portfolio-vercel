"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
      title: "Programming Languages",
      skills: ["JavaScript", "TypeScript", "Python"],
      icon: "💻",
    },
    {
      title: "Backend Frameworks",
      skills: ["Node.js", "Express.js", "Bun.js", "Hono.js", "Django", "Flask"],
      icon: "⚙️",
    },
    {
      title: "Frontend Technologies",
      skills: ["React.js", "jQuery", "HTML/CSS", "Tailwind CSS"],
      icon: "🎨",
    },
    {
      title: "Databases",
      skills: ["MongoDB", "Firebase", "PostgreSQL", "MySQL", "Redis", "SQLite"],
      icon: "🗄️",
    },
    {
      title: "Tools & Libraries",
      skills: ["Prisma", "Mongoose", "SQLAlchemy", "Bull MQ", "Scrapy", "NodeBB"],
      icon: "🔧",
    },
    {
      title: "Development Tools",
      skills: ["Git", "GitHub", "Postman", "ThunderClient", "Google APIs", "REST APIs"],
      icon: "🛠️",
    },
    {
      title: "Deployment & DevOps",
      skills: ["PM2", "NGINX", "AWS", "Render", "Netlify", "MongoDB Atlas", "Cloudinary"],
      icon: "☁️",
    },
    {
      title: "Specialized Technologies",
      skills: ["OpenCV", "YOLOv8", "Ultralytics", "Ngrok", "CORS Handling"],
      icon: "🤖",
    },
  ]

  return (
    <section ref={ref} id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <h2
          className={`text-3xl font-bold text-center mb-12 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Skills & Technologies
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className={`hover:shadow-lg transition-all duration-500 hover:scale-[1.05] group ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardHeader className="text-center">
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-200">
                  {category.icon}
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105"
                      style={{ animationDelay: `${skillIndex * 50}ms` }}
                    >
                      {skill}
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
