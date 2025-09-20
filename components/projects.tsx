"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Github, Lock, ExternalLink } from "lucide-react"
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
      title: "Real Estate Underwriter AI",
      description:
        "Architected an AI-powered underwriting flow that ingests T12s, Rent Rolls, property data, and investor criteria, then delivers investment decisions with detailed metrics and reasoning, cutting underwriting time from hours to seconds.",
      technologies: [
        "Node.js",
        "Express.js",
        "TypeScript",
        "Gemini 2.5 Pro",
        "XLSX",
        "Pdf-Parser",
        "Next.js",
        "ShadCn",
        "Lucide",
        "Attom APIs",
      ],
      github: "https://github.com/Ns-Dev64/real_estate_underwriter_server",
      liveDemo: "https://real-estate-underwriter-client.vercel.app",
      featured: true,
      isPrivate: false,
    },
    {
      title: "Notemind LLM",
      description:
        "Designed and implemented an advanced RAG pipeline for multimodal knowledge management, enabling users to upload and query across PDFs, documents, CSVs, videos, and audios with outputs like summaries, podcasts, mindmaps, and flowcharts.",
      technologies: [
        "Next.js",
        "Bun.js",
        "Elysia.js",
        "Express.js",
        "LangChain",
        "TypeScript",
        "MongoDB",
        "PineconeDB",
        "HuggingFace",
        "ffmpeg",
        "Mermaid.js",
        "Gemini 2.5 Flash",
      ],
      github: "https://github.com/Ns-Dev64/Notebook_RAG",
      liveDemo: "https://notebook-rag-three.vercel.app/",
      featured: true,
      isPrivate: false,
    },
    {
      title: "Marketplace Server",
      description:
        "Built a high-performance Bun backend with custom clustering, cutting memory use by 40% and maximizing CPU efficiency. Integrated Redis and BullMQ for fault-tolerant background processing, improving job throughput by 35%.",
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
      title: "Platoon Plate (ALPR System)",
      description:
        "Full-stack Automatic License Plate Recognition system designed for Indian Army checkposts using YOLOv8 for real-time detection. Built with MVC pattern and integrated AI model with web interface.",
      technologies: ["Flask", "Python", "OpenCV", "JavaScript", "MySQL", "SQLAlchemy", "YOLOv8", "Ultralytics"],
      github: "https://github.com/chiku0989/flask_backend",
      featured: false,
      isPrivate: false,
    },
    {
      title: "Deep Dossier",
      description:
        "TypeScript-based note management app with bulk operations, real-time retrieval, and tag-based organization for structured technical content.",
      technologies: ["TypeScript", "Claude Sonnet 4", "MCP-SDK", "Zod", "Prisma", "SQLite"],
      github: "https://github.com/Ns-Dev64/Summarizer-MCP",
      featured: false,
      isPrivate: false,
    },
  ]

  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  const handlePrivateRepoClick = (e: React.MouseEvent) => {
    e.preventDefault()
  }

  return (
    <section ref={ref} id="projects" className="section-padding bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2
            className={`text-responsive-lg font-bold mb-4 transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            Projects
          </h2>
          <div className="divider" />
        </div>

        <TooltipProvider>
          {/* Featured Projects */}
          <div className="mb-16">
            <h3
              className={`text-xl font-semibold mb-8 transition-all duration-700 delay-200 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              Featured Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <Card
                  key={index}
                  className={`card-minimal hover-scale h-full transition-all duration-700 ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-lg">
                      <span>{project.title}</span>
                      <div className="flex space-x-2">
                        {project.liveDemo && (
                          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        {project.isPrivate ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 cursor-not-allowed opacity-60"
                                onClick={handlePrivateRepoClick}
                              >
                                <Lock className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-sm">Private repository</p>
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="badge-minimal text-xs">
                          {tech}
                        </span>
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
              className={`text-xl font-semibold mb-8 transition-all duration-700 delay-500 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
            >
              Other Projects
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {otherProjects.map((project, index) => (
                <Card
                  key={index}
                  className={`card-minimal hover-scale transition-all duration-700 ${
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${(index + 4) * 200}ms` }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-lg">
                      <span>{project.title}</span>
                      <div className="flex space-x-2">
                        {project.liveDemo && (
                          <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                            <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="badge-minimal text-xs">
                          {tech}
                        </span>
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
