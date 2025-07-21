"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Download } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <div
            className={`w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-foreground/20 to-foreground/5 p-1 transition-all duration-1000 ${
              isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          >
            <Image
              src="/images/profile.png"
              alt="Navaneet"
              width={128}
              height={128}
              className="w-full h-full object-cover rounded-full hover:scale-110 transition-transform duration-300"
              priority
            />
          </div>

          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 transition-all duration-1000 delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            Hi, I'm <span className="bg-gradient-to-r bg-clip-text text-transparent animate-pulse">Navaneet</span>
          </h1>

          <p
            className={`text-xl sm:text-2xl text-muted-foreground mb-6 transition-all duration-1000 delay-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            Backend-Focused Fullstack Developer
          </p>

          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            Passionate about building scalable backend systems and high-performance applications. I specialize in
            Node.js, Python, and modern web technologies, with experience in EdTech solutions.
          </p>
        </div>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 transition-all duration-1000 delay-900 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Button
            size="lg"
            className="w-full sm:w-auto hover:scale-105 transition-transform duration-200 group bg-foreground text-background hover:bg-foreground/90"
            asChild
          >
            <a href="mailto:yashsingh990765@gmail.com">
              <Mail className="mr-2 h-4 w-4 group-hover:animate-bounce" />
              Get In Touch
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto hover:scale-105 transition-transform duration-200 group border-foreground text-foreground hover:bg-foreground hover:text-background"
            asChild
          >
            <a
              href="https://drive.google.com/file/d/1o7XQqblBDNAJs9cwlhH8Q6cbQWDySBww/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
              Download Resume
            </a>
          </Button>
        </div>

        <div
          className={`flex justify-center space-x-6 transition-all duration-1000 delay-1100 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Button
            variant="ghost"
            size="icon"
            className="hover:scale-110 hover:text-foreground transition-all duration-200"
            asChild
          >
            <a href="https://github.com/Ns-Dev64" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:scale-110 hover:text-foreground transition-all duration-200"
            asChild
          >
            <a href="https://www.linkedin.com/in/navaneet-singh-7a7a5627b" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:scale-110 hover:text-foreground transition-all duration-200"
            asChild
          >
            <a href="mailto:yashsingh990765@gmail.com">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
