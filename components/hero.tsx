"use client"
import { Github, Linkedin, Download, Mail } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-20 px-4">
      <div className="max-w-3xl mx-auto w-full">
        <div
          className={`transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Profile Image */}
          <div className="flex justify-center mb-12 animate-scale-in">
            <div className="card-robotic p-1 hover-lift">
              <Image
                src="/images/profile.png"
                alt="K.N Navaneet Singh"
                width={120}
                height={120}
                className="rounded-none"
                priority
              />
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-6">
            <h1 className="title-robotic text-responsive-xl mb-2 animate-fade-in-up">K.N NAVANEET SINGH</h1>
            <p
              className="text-sm tracking-widest uppercase text-muted-foreground animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Backend Engineer
            </p>
          </div>

          {/* Divider */}
          <div className="divider-robotic" />

          {/* Description - Shortened bio */}
          <p
            className="text-center text-base text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Specialized in building scalable AI-powered backend systems with FastAPI and Node.js, focusing on real-time
            solutions and LLM integration.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <a href="mailto:yashsingh990765@gmail.com" className="btn-robotic btn-robotic-primary group">
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </a>
            <a
              href="https://drive.google.com/file/d/1VSnYaKQOqc9gKMmVLArjGB35EtjiVydy/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-robotic btn-robotic-secondary"
            >
              <Download className="mr-2 h-4 w-4" />
              Resume
            </a>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-8 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <a
              href="https://github.com/Ns-Dev64"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-muted-foreground transition-all duration-300 hover:scale-125 hover-lift"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/navaneet-singh-7a7a5627b"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-muted-foreground transition-all duration-300 hover:scale-125 hover-lift"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
