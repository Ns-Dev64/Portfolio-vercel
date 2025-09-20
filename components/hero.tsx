"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Download, Mail } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center section-padding">
      <div className="max-w-3xl mx-auto text-center">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-8">
            <Image
              src="/images/profile.png"
              alt="Navaneet Singh"
              width={120}
              height={120}
              className="rounded-full mx-auto mb-6 hover-scale"
              priority
            />
          </div>

          <h1 className="text-responsive-xl font-bold mb-4 text-balance">
            Hi, I'm <span className="text-muted-foreground">Navaneet Singh</span>
          </h1>

          <p className="text-responsive-lg text-muted-foreground mb-6">Backend Developer</p>

          <div className="divider mb-8" />

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
            Passionate about building scalable backend systems and high-performance applications. I specialize in
            Node.js, Python, and modern web technologies.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" className="btn-primary" asChild>
              <a href="mailto:yashsingh990765@gmail.com">
                <Mail className="mr-2 h-4 w-4" />
                Get In Touch
              </a>
            </Button>
            <Button variant="outline" size="lg" className="btn-secondary bg-transparent" asChild>
              <a
                href="https://drive.google.com/file/d/1DLYdFXPrnNAzscQlz3YBjeMfTi-uUv62/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-4 w-4" />
                Resume
              </a>
            </Button>
          </div>

          <div className="flex justify-center space-x-4">
            <Button variant="ghost" size="icon" className="hover-lift" asChild>
              <a href="https://github.com/Ns-Dev64" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" className="hover-lift" asChild>
              <a href="https://www.linkedin.com/in/navaneet-singh-7a7a5627b" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
