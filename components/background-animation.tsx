"use client"

import { useEffect, useRef, useState } from "react"

export function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }

    checkTheme()

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Smooth particle system
    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      opacity: number
      targetOpacity: number
      age: number
      maxAge: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 1.5 + 0.5
        this.opacity = 0
        this.targetOpacity = Math.random() * 0.3 + 0.1
        this.age = 0
        this.maxAge = Math.random() * 8000 + 4000
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.age++

        // Smooth opacity fade in and out
        const ageRatio = this.age / this.maxAge

        if (ageRatio < 0.1) {
          this.opacity = (ageRatio / 0.1) * this.targetOpacity
        } else if (ageRatio > 0.85) {
          this.opacity = ((1 - ageRatio) / 0.15) * this.targetOpacity
        } else {
          this.opacity = this.targetOpacity
        }

        // Wrap around edges with smooth transition
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0

        // Reset particle when age exceeds max
        if (this.age >= this.maxAge) {
          this.age = 0
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.targetOpacity = Math.random() * 0.3 + 0.1
        }
      }

      draw() {
        if (!ctx) return

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${this.opacity})` : `rgba(0, 0, 0, ${this.opacity * 0.5})`
        ctx.fill()
      }
    }

    // Create particles
    const particles: Particle[] = []
    const particleCount = 40

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Connection system - more subtle
    function drawConnections() {
      if (!ctx) return
      const maxDistance = 120

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.08 * particles[i].opacity * particles[j].opacity

            ctx.beginPath()
            ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity * 0.5})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Floating geometric shapes - more refined
    const shapes: Array<{
      x: number
      y: number
      size: number
      vx: number
      vy: number
      rotation: number
      rotationSpeed: number
      opacity: number
      type: number
    }> = []

    for (let i = 0; i < 8; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 150 + 80,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.02 + 0.01,
        type: Math.floor(Math.random() * 3),
      })
    }

    // Animation loop
    let animationFrameId: number
    let time = 0

    const animate = () => {
      if (!ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.016

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw connections
      drawConnections()

      // Update and draw shapes
      shapes.forEach((shape) => {
        shape.x += shape.vx
        shape.y += shape.vy
        shape.rotation += shape.rotationSpeed

        // Wrap around edges
        if (shape.x < -shape.size) shape.x = canvas.width + shape.size
        if (shape.x > canvas.width + shape.size) shape.x = -shape.size
        if (shape.y < -shape.size) shape.y = canvas.height + shape.size
        if (shape.y > canvas.height + shape.size) shape.y = -shape.size

        // Draw shape with subtle gradient
        ctx.save()
        ctx.translate(shape.x, shape.y)
        ctx.rotate((shape.rotation * Math.PI) / 180)

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, shape.size / 2)

        if (isDark) {
          gradient.addColorStop(0, `rgba(255, 255, 255, ${shape.opacity * 0.8})`)
          gradient.addColorStop(0.7, `rgba(255, 255, 255, ${shape.opacity * 0.3})`)
          gradient.addColorStop(1, `rgba(255, 255, 255, 0)`)
        } else {
          gradient.addColorStop(0, `rgba(0, 0, 0, ${shape.opacity * 0.3})`)
          gradient.addColorStop(0.7, `rgba(0, 0, 0, ${shape.opacity * 0.1})`)
          gradient.addColorStop(1, `rgba(0, 0, 0, 0)`)
        }

        ctx.fillStyle = gradient

        switch (shape.type) {
          case 0: // Circle
            ctx.beginPath()
            ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2)
            ctx.fill()
            break
          case 1: // Square
            ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
            break
          case 2: // Triangle
            ctx.beginPath()
            ctx.moveTo(0, -shape.size / 2)
            ctx.lineTo(shape.size / 2, shape.size / 2)
            ctx.lineTo(-shape.size / 2, shape.size / 2)
            ctx.closePath()
            ctx.fill()
            break
        }

        ctx.restore()
      })

      // Subtle ambient glow
      const glowOpacity = (Math.sin(time * 0.3) * 0.5 + 0.5) * 0.01
      const glowGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)

      if (isDark) {
        glowGradient.addColorStop(0, `rgba(255, 255, 255, ${glowOpacity * 0.3})`)
        glowGradient.addColorStop(0.5, `rgba(255, 255, 255, ${glowOpacity * 0.1})`)
        glowGradient.addColorStop(1, `rgba(255, 255, 255, ${glowOpacity * 0.3})`)
      } else {
        glowGradient.addColorStop(0, `rgba(0, 0, 0, ${glowOpacity * 0.1})`)
        glowGradient.addColorStop(0.5, `rgba(0, 0, 0, ${glowOpacity * 0.03})`)
        glowGradient.addColorStop(1, `rgba(0, 0, 0, ${glowOpacity * 0.1})`)
      }

      ctx.fillStyle = glowGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Clean up
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
      observer.disconnect()
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
