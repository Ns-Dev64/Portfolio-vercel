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

    // Enhanced particle system
    class Particle {
      x: number
      y: number
      originalX: number
      originalY: number
      size: number
      speedX: number
      speedY: number
      opacity: number
      hue: number
      life: number
      maxLife: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.originalX = this.x
        this.originalY = this.y
        this.size = Math.random() * 4 + 1
        this.speedX = (Math.random() - 0.5) * 1.5
        this.speedY = (Math.random() - 0.5) * 1.5
        this.opacity = Math.random() * 0.8 + 0.2
        this.hue = Math.random() * 60
        this.life = 0
        this.maxLife = Math.random() * 300 + 200
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        this.life++

        // Life cycle fade
        const lifeCycle = this.life / this.maxLife
        if (lifeCycle < 0.1) {
          this.opacity = lifeCycle * 10 * 0.8
        } else if (lifeCycle > 0.9) {
          this.opacity = (1 - lifeCycle) * 10 * 0.8
        }

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0

        // Reset particle when life ends
        if (this.life >= this.maxLife) {
          this.life = 0
          this.x = Math.random() * canvas.width
          this.y = Math.random() * canvas.height
          this.originalX = this.x
          this.originalY = this.y
          this.hue = Math.random() * 60
        }
      }

      draw() {
        if (!ctx) return

        // Create gradient for each particle
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2)

        if (isDark) {
          gradient.addColorStop(0, `hsla(${200 + this.hue}, 70%, 80%, ${this.opacity})`)
          gradient.addColorStop(1, `hsla(${200 + this.hue}, 70%, 60%, 0)`)
        } else {
          gradient.addColorStop(0, `hsla(${220 + this.hue}, 60%, 40%, ${this.opacity * 0.6})`)
          gradient.addColorStop(1, `hsla(${220 + this.hue}, 60%, 20%, 0)`)
        }

        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }
    }

    // Create particles
    const particles: Particle[] = []
    const particleCount = 80

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Enhanced connection system
    function connectParticles() {
      if (!ctx) return
      const maxDistance = 150

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.4
            const gradient = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y)

            if (isDark) {
              gradient.addColorStop(0, `hsla(200, 70%, 70%, ${opacity})`)
              gradient.addColorStop(0.5, `hsla(220, 70%, 80%, ${opacity * 0.8})`)
              gradient.addColorStop(1, `hsla(240, 70%, 70%, ${opacity})`)
            } else {
              gradient.addColorStop(0, `hsla(220, 60%, 30%, ${opacity * 0.5})`)
              gradient.addColorStop(0.5, `hsla(240, 60%, 40%, ${opacity * 0.3})`)
              gradient.addColorStop(1, `hsla(260, 60%, 30%, ${opacity * 0.5})`)
            }

            ctx.beginPath()
            ctx.strokeStyle = gradient
            ctx.lineWidth = 1.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Floating geometric shapes with gradients
    const shapes: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      rotation: number
      rotationSpeed: number
      opacity: number
      type: number
      hue: number
      pulse: number
    }> = []

    for (let i = 0; i < 12; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 200 + 100,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.04 + 0.02,
        type: Math.floor(Math.random() * 4),
        hue: Math.random() * 80,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0
    let mouseInfluence = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      mouseInfluence = 1
    }

    const handleMouseEnter = () => {
      mouseInfluence = 1
    }

    const handleMouseLeave = () => {
      mouseInfluence = 0
    }

    // Add event listeners to document body instead of canvas since canvas has pointer-events: none
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    // Animation loop
    let animationFrameId: number
    let time = 0

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.01

      // Update and draw particles with mouse interaction
      particles.forEach((particle, index) => {
        // Mouse attraction effect
        if (mouseInfluence > 0) {
          const dx = mouseX - particle.x
          const dy = mouseY - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 250) {
            const force = ((250 - distance) / 250) * 0.05 * mouseInfluence
            const angle = Math.atan2(dy, dx)
            particle.speedX += Math.cos(angle) * force
            particle.speedY += Math.sin(angle) * force

            // Limit speed to prevent particles from moving too fast
            const maxSpeed = 3
            const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY)
            if (currentSpeed > maxSpeed) {
              particle.speedX = (particle.speedX / currentSpeed) * maxSpeed
              particle.speedY = (particle.speedY / currentSpeed) * maxSpeed
            }
          }
        }

        // Apply damping to gradually slow down particles
        particle.speedX *= 0.98
        particle.speedY *= 0.98

        particle.update()
        particle.draw()
      })

      // Gradually reduce mouse influence
      mouseInfluence *= 0.95

      // Draw connections
      connectParticles()

      // Update and draw floating shapes
      shapes.forEach((shape, index) => {
        shape.x += shape.speedX
        shape.y += shape.speedY
        shape.rotation += shape.rotationSpeed
        shape.pulse += 0.02

        // Pulsing effect
        const pulseFactor = 1 + Math.sin(shape.pulse) * 0.1
        const currentSize = shape.size * pulseFactor

        // Wrap around edges
        if (shape.x < -currentSize) shape.x = canvas.width + currentSize
        if (shape.x > canvas.width + currentSize) shape.x = -currentSize
        if (shape.y < -currentSize) shape.y = canvas.height + currentSize
        if (shape.y > canvas.height + currentSize) shape.y = -currentSize

        // Draw shape with gradient
        ctx.save()
        ctx.translate(shape.x, shape.y)
        ctx.rotate((shape.rotation * Math.PI) / 180)

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, currentSize / 2)

        if (isDark) {
          gradient.addColorStop(0, `hsla(${180 + shape.hue}, 60%, 70%, ${shape.opacity})`)
          gradient.addColorStop(0.7, `hsla(${200 + shape.hue}, 70%, 60%, ${shape.opacity * 0.5})`)
          gradient.addColorStop(1, `hsla(${220 + shape.hue}, 80%, 50%, 0)`)
        } else {
          gradient.addColorStop(0, `hsla(${200 + shape.hue}, 50%, 50%, ${shape.opacity})`)
          gradient.addColorStop(0.7, `hsla(${220 + shape.hue}, 60%, 40%, ${shape.opacity * 0.5})`)
          gradient.addColorStop(1, `hsla(${240 + shape.hue}, 70%, 30%, 0)`)
        }

        ctx.fillStyle = gradient

        switch (shape.type) {
          case 0: // Circle
            ctx.beginPath()
            ctx.arc(0, 0, currentSize / 2, 0, Math.PI * 2)
            ctx.fill()
            break
          case 1: // Square
            ctx.fillRect(-currentSize / 2, -currentSize / 2, currentSize, currentSize)
            break
          case 2: // Triangle
            ctx.beginPath()
            ctx.moveTo(0, -currentSize / 2)
            ctx.lineTo(currentSize / 2, currentSize / 2)
            ctx.lineTo(-currentSize / 2, currentSize / 2)
            ctx.closePath()
            ctx.fill()
            break
          case 3: // Hexagon
            ctx.beginPath()
            for (let i = 0; i < 6; i++) {
              const angle = (i * Math.PI) / 3
              const x = (Math.cos(angle) * currentSize) / 2
              const y = (Math.sin(angle) * currentSize) / 2
              if (i === 0) ctx.moveTo(x, y)
              else ctx.lineTo(x, y)
            }
            ctx.closePath()
            ctx.fill()
            break
        }

        ctx.restore()
      })

      // Add subtle wave effect
      const waveGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      if (isDark) {
        waveGradient.addColorStop(0, `hsla(200, 60%, 60%, ${0.02 + Math.sin(time) * 0.01})`)
        waveGradient.addColorStop(0.5, `hsla(220, 70%, 70%, ${0.01 + Math.cos(time * 1.3) * 0.005})`)
        waveGradient.addColorStop(1, `hsla(240, 80%, 80%, ${0.02 + Math.sin(time * 0.8) * 0.01})`)
      } else {
        waveGradient.addColorStop(0, `hsla(220, 50%, 40%, ${0.015 + Math.sin(time) * 0.005})`)
        waveGradient.addColorStop(0.5, `hsla(240, 60%, 30%, ${0.01 + Math.cos(time * 1.3) * 0.003})`)
        waveGradient.addColorStop(1, `hsla(260, 70%, 20%, ${0.015 + Math.sin(time * 0.8) * 0.005})`)
      }

      ctx.fillStyle = waveGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Clean up
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
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
