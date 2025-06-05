"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled className="hover:scale-110 transition-transform duration-200">
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
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
