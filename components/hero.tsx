import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 p-1">
            <Image
              src="/images/profile.png"
              alt="Navaneet"
              width={128}
              height={128}
              className="w-full h-full object-cover rounded-full"
              priority
            />
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Hi, I'm <span className="text-primary">Navaneet</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-6">Backend-Focused Fullstack Developer</p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Passionate about building scalable backend systems and high-performance applications. I specialize in
            Node.js, Python, and modern web technologies, with experience in EdTech and marketplace solutions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button size="lg" className="w-full sm:w-auto">
            <Mail className="mr-2 h-4 w-4" />
            Get In Touch
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </Button>
        </div>

        <div className="flex justify-center space-x-6">
          <Button variant="ghost" size="icon">
            <Github className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Linkedin className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Mail className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
