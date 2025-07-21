"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
    // Check if dark mode is already enabled
    const savedTheme = localStorage.getItem("theme")
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    } else {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)

    if (newTheme) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      // Show encouraging message when switching to dark mode
      toast({
        title: "Welcome to the dark side! 😈",
        description: "Much better for your eyes and looks way cooler!",
        duration: 3000,
      })
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      // Show playful message when switching to light mode
      toast({
        title: "Really? Light mode? 🤕",
        description: "Dark mode is cooler, c'mon... but hey, your choice!",
        duration: 4000,
      })
    }
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled className="hover:scale-110 transition-transform duration-200">
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="hover:scale-110 hover:rotate-12 transition-all duration-300 group"
    >
      {isDark ? (
        <Sun className="h-5 w-5 transition-all duration-300 group-hover:animate-spin" />
      ) : (
        <Moon className="h-5 w-5 transition-all duration-300 group-hover:animate-pulse" />
      )}
    </Button>
  )
}
