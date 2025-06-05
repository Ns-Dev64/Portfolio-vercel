import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

export function Projects() {
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
      github: "https://github.com/Ns-Dev64",
      demo: "#",
      featured: true,
    },
    {
      title: "DT-Transcend (Ed-Tech SaaS)",
      description:
        "EdTech SaaS platform with APIs for core tools including Maturity Builder, Rigor Builder, and Insight Spotter. Handles 5000+ user posts monthly with optimized feed delivery and asset storage.",
      technologies: ["Node.js", "Express.js", "MongoDB", "Postman", "Google APIs", "Google Sheets"],
      github: "https://github.com/Ns-Dev64",
      demo: "#",
      featured: true,
    },
    {
      title: "Platoon Plate (ALPR System)",
      description:
        "Full-stack Automatic License Plate Recognition system using YOLOv8 for real-time detection. Built with MVC pattern and integrated AI model with web interface for processing and storing results.",
      technologies: ["Flask", "Python", "OpenCV", "JavaScript", "MySQL", "SQLAlchemy", "YOLOv8", "Ultralytics"],
      github: "https://github.com/Ns-Dev64",
      demo: "#",
      featured: false,
    },
  ]

  const featuredProjects = projects.filter((p) => p.featured)
  const otherProjects = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>

        {/* Featured Projects */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">Featured Projects</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredProjects.map((project, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {project.title}
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline">
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
          <h3 className="text-2xl font-semibold mb-6">Other Projects</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {otherProjects.map((project, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-lg">
                    {project.title}
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
