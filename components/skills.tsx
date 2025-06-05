import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["JavaScript", "TypeScript", "Python"],
    },
    {
      title: "Backend Frameworks",
      skills: ["Node.js", "Express.js", "Bun.js", "Hono.js", "Django", "Flask"],
    },
    {
      title: "Frontend Technologies",
      skills: ["React.js", "jQuery", "HTML/CSS", "Tailwind CSS"],
    },
    {
      title: "Databases",
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "SQLite"],
    },
    {
      title: "Tools & Libraries",
      skills: ["Prisma", "Mongoose", "SQLAlchemy", "Bull MQ", "Scrapy", "NodeBB"],
    },
    {
      title: "Development Tools",
      skills: ["Git", "GitHub", "Postman", "ThunderClient", "Google APIs", "REST APIs"],
    },
    {
      title: "Deployment & DevOps",
      skills: ["PM2", "NGINX", "AWS", "Render", "Netlify", "MongoDB Atlas", "Cloudinary"],
    },
    {
      title: "Specialized Technologies",
      skills: ["OpenCV", "YOLOv8", "Ultralytics", "Ngrok", "CORS Handling"],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Skills & Technologies</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{category.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
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
