"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Github, Lock } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function Projects() {
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

  const projects = [
    {
      title: "Marketplace Server",
      description:
        "High-performance marketplace backend using Bun.js with custom clustering architecture. Achieved 40% better performance than traditional Node.js implementations with fault tolerance and full CPU core utilization.",
      technologies: [
        "Bun.js",
        "Hono.js",
        "TypeScript",
        "Prisma",
        "PostgreSQL",
        "Redis",
        "Bull MQ",
        "Cloudinary",
        "PM2",
        "NGINX",
      ],
      github: "https://github.com/Ns-Dev64/marketplace",
      featured: true,
      isPrivate: false,
    },
    {
      title: "DT-Transcend (Ed-Tech SaaS)",
      description:
        "EdTech SaaS platform with APIs for core tools including Maturity Builder, Rigor Builder, and Insight Spotter. Handles 5000+ user posts monthly with optimized feed delivery and asset storage.",
      technologies: ["Node.js", "Express.js", "MongoDB", "Postman", "Google APIs", "Google Sheets"],
      featured: true,
      isPrivate: true,
    },
    {
      title: "Platoon Plate (ALPR System)",
      description:
        "Full-stack Automatic License Plate Recognition system using YOLOv8 for real-time detection. Built with MVC pattern and integrated AI model with web interface for processing and storing results.",
      technologies: ["Flask", "Python", "OpenCV", "JavaScript", "MySQL", "SQLAlchemy", "YOLOv8", "Ultralytics"],
      github: "https://github.com/chiku0989/flask_backend",
      featured: false,
      isPrivate: false,
    },
    {
      title: "Deep Dosier",
      description:
        "Deep Dossier is a TypeScript-based note management app with bulk operations, real-time retrieval, and tag-based organization for structured technical content.",
      technologies: ["TypeScript", "Claude Sonnet 4", "MCP-SDK(Model-Context-Protocol)", "Zod", "Prisma", "SQLite"],
      github: "https://github.com/Ns-Dev64/Summarizer-MCP",
      featured: false,
      isPrivate: false,
    },
  ]

  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  const handlePrivateRepoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // The tooltip will handle showing the message
  }

  return (
    <section ref={ref} id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-3xl font-bold text-center mb-12 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Projects
        </h2>

        <TooltipProvider>
          {/* Featured Projects */}
          <div className="mb-12">
            <h3
              className={`text-2xl font-semibold mb-6 transition-all duration-1000 delay-200 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              Featured Projects
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredProjects.map((project, index) => (
                <Card
                  key={index}
                  className={`h-full hover:shadow-xl transition-all duration-500 hover:scale-[1.03] group border-l-4 border-l-primary/20 hover:border-l-primary ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 300}ms` }}
                >
                  <CardHeader className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <CardTitle className="flex items-center justify-between relative z-10">
                      <span className="group-hover:text-primary transition-colors duration-200">{project.title}</span>
                      <div className="flex space-x-2">
                        {project.isPrivate ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={handlePrivateRepoClick}
                                className="hover:scale-110 transition-transform duration-200 cursor-not-allowed opacity-60"
                              >
                                <Lock className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-sm">Violates company guidelines.</p>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            className="hover:scale-110 transition-transform duration-200"
                          >
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <p className="text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 hover:scale-105"
                          style={{ animationDelay: `${techIndex * 50}ms` }}
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

          {/* Other Projects */}
          <div>
            <h3
              className={`text-2xl font-semibold mb-6 transition-all duration-1000 delay-500 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              Other Projects
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {otherProjects.map((project, index) => (
                <Card
                  key={index}
                  className={`hover:shadow-lg transition-all duration-500 hover:scale-[1.02] group ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                  }`}
                  style={{ transitionDelay: `${(index + 3) * 300}ms` }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-lg">
                      <span className="group-hover:text-primary transition-colors duration-200">{project.title}</span>
                      <div className="flex space-x-2">
                        {project.isPrivate ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={handlePrivateRepoClick}
                                className="hover:scale-110 transition-transform duration-200 cursor-not-allowed opacity-60"
                              >
                                <Lock className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-sm">Can't expose company code</p>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="hover:scale-110 transition-transform duration-200"
                          >
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                          style={{ animationDelay: `${techIndex * 50}ms` }}
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
        </TooltipProvider>
      </div>
    </section>
  )
}
