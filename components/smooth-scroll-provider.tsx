"use client"

import type React from "react"

import { useEffect } from "react"

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Enhanced smooth scrolling for better animation
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target.tagName === "A" && target.getAttribute("href")?.startsWith("#")) {
        e.preventDefault()
        const href = target.getAttribute("href")
        if (href) {
          const targetElement = document.querySelector(href)
          if (targetElement) {
            const headerHeight = 80
            const elementPosition = targetElement.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight

            // Add a subtle fade effect during scroll
            document.body.style.transition = "opacity 0.3s ease"
            document.body.style.opacity = "0.95"

            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth",
            })

            // Reset opacity after scroll
            setTimeout(() => {
              document.body.style.opacity = "1"
              setTimeout(() => {
                document.body.style.transition = ""
              }, 300)
            }, 100)
          }
        }
      }
    }

    // Add intersection observer for section animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "-50px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up")
        }
      })
    }, observerOptions)

    // Observe all sections
    const sections = document.querySelectorAll("section")
    sections.forEach((section) => {
      observer.observe(section)
    })

    document.addEventListener("click", handleSmoothScroll)

    return () => {
      document.removeEventListener("click", handleSmoothScroll)
      observer.disconnect()
    }
  }, [])

  return <>{children}</>
}
