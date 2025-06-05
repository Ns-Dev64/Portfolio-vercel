"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@/hooks/use-theme"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { isDark } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3 // Make canvas taller to cover all sections
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create geometric shapes
    const shapes = []
    const shapeCount = 15

    for (let i = 0; i < shapeCount; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 100 + 50,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.05 + 0.02,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        type: Math.floor(Math.random() * 3), // 0: circle, 1: square, 2: triangle
      })
    }

    // Animation loop
    let animationFrameId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw shapes
      shapes.forEach((shape) => {
        // Update position
        shape.x += shape.speedX
        shape.y += shape.speedY
        shape.rotation += shape.rotationSpeed

        // Bounce off edges
        if (shape.x < -shape.size || shape.x > canvas.width + shape.size) shape.speedX *= -1
        if (shape.y < -shape.size || shape.y > canvas.height + shape.size) shape.speedY *= -1

        // Draw shape
        ctx.save()
        ctx.translate(shape.x, shape.y)
        ctx.rotate((shape.rotation * Math.PI) / 180)
        ctx.globalAlpha = shape.opacity
        ctx.fillStyle = isDark ? "white" : "black"

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

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Clean up
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isDark])

  return (
    <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none -z-20" aria-hidden="true" />
  )
}
