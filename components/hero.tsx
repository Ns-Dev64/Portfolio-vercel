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
          <div className="flex justify-center mb-12">
            <div className="card-robotic p-1">
              <Image
                src="/images/profile.png"
                alt="Navaneet Singh"
                width={120}
                height={120}
                className="rounded-none"
                priority
              />
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-6">
            <h1 className="title-robotic text-responsive-xl mb-2">NAVANEET SINGH</h1>
            <p className="text-sm tracking-widest uppercase text-muted-foreground">Backend Engineer</p>
          </div>

          {/* Divider */}
          <div className="divider-robotic" />

          {/* Description */}
          <p className="text-center text-base text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Crafting scalable backend systems and high-performance applications. Specialized in Node.js, Python, and
            modern web technologies with a focus on architecture and optimization.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="btn-robotic btn-robotic-primary group">
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </button>
            <button className="btn-robotic btn-robotic-secondary">
              <Download className="mr-2 h-4 w-4" />
              Resume
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-8">
            <a
              href="https://github.com/Ns-Dev64"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-muted-foreground transition-colors duration-200"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/navaneet-singh-7a7a5627b"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-muted-foreground transition-colors duration-200"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
