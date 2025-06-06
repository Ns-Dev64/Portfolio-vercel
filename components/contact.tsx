"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  User,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  WifiOff,
  Database,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { submitContactForm, testFirebaseConnection, type ContactFormData } from "@/lib/contact-service"

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [connectionStatus, setConnectionStatus] = useState<"unknown" | "connected" | "disconnected">("unknown")
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Test connection when component becomes visible
          testConnection()
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const testConnection = async () => {
    try {
      const isConnected = await testFirebaseConnection()
      setConnectionStatus(isConnected ? "connected" : "disconnected")
    } catch (error) {
      setConnectionStatus("disconnected")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setConnectionStatus("connected")
      } else {
        setSubmitStatus("error")

        // Provide user-friendly error messages
        if (result.error?.code === "permission-denied") {
          setErrorMessage(
            "Permission denied. Please check that Firestore security rules allow contact form submissions.",
          )
        } else if (result.error?.code === "unavailable") {
          setErrorMessage("Service temporarily unavailable. Please try again in a moment.")
        } else if (result.error?.code === "max-retries-exceeded") {
          setErrorMessage("Connection issues detected. Please try again later or contact me directly via email.")
        } else {
          setErrorMessage(result.error?.message || "Failed to send message. Please try again.")
        }

        setConnectionStatus("disconnected")
      }
    } catch (error) {
      setSubmitStatus("error")
      setErrorMessage("Network error. Please check your connection and try again.")
      setConnectionStatus("disconnected")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section ref={ref} id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-3xl font-bold text-center mb-12 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Get In Touch
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Let's Connect</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm always open to discussing new opportunities, backend development challenges, or collaborating on
                interesting projects. Whether it's about performance optimization, API development, or EdTech solutions,
                feel free to reach out!
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-all duration-300 hover:scale-105 group">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary group-hover:animate-bounce" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">yashsingh990765@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-all duration-300 hover:scale-105 group">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-primary group-hover:animate-bounce" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">+91 9886590699</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-all duration-300 hover:scale-105 group">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-primary group-hover:animate-bounce" />
                </div>
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-muted-foreground">Hospet, Karnataka, India</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                size="lg"
                className="flex-1 hover:scale-105 hover:rotate-1 transition-all duration-300 group"
                asChild
              >
                <a href="https://github.com/Ns-Dev64" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  GitHub
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1 hover:scale-105 hover:rotate-1 transition-all duration-300 group"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/navaneet-singh-7a7a5627b"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <Card
            className={`hover:shadow-xl transition-all duration-1000 delay-400 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Send Me a Message
                </div>
                {connectionStatus !== "unknown" && (
                  <div className="flex items-center gap-1 text-xs">
                    {connectionStatus === "connected" ? (
                      <>
                        <Database className="h-3 w-3 text-green-500" />
                        <span className="text-green-500">Ready</span>
                      </>
                    ) : (
                      <>
                        <WifiOff className="h-3 w-3 text-yellow-500" />
                        <span className="text-yellow-500">Checking...</span>
                      </>
                    )}
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Success/Error Messages */}
              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-2 text-green-800 dark:text-green-200">
                  <CheckCircle className="h-5 w-5" />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-800 dark:text-red-200">
                  <AlertCircle className="h-5 w-5" />
                  <div>
                    <p className="font-medium">Failed to send message</p>
                    <p className="text-sm">{errorMessage}</p>
                    <p className="text-xs mt-1 opacity-75">
                      You can also reach me directly at: yashsingh990765@gmail.com
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="transition-all duration-200 focus:scale-[1.02]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="transition-all duration-200 focus:scale-[1.02]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="transition-all duration-200 focus:scale-[1.02]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project, question, or just say hello!"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    rows={5}
                    className="transition-all duration-200 focus:scale-[1.02] resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full hover:scale-105 transition-all duration-200 group bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-background mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                      Send Message
                    </>
                  )}
                </Button>

                {connectionStatus === "disconnected" && (
                  <div className="text-center">
                    <Button type="button" variant="outline" size="sm" onClick={testConnection} className="text-xs">
                      <Database className="mr-1 h-3 w-3" />
                      Test Connection
                    </Button>
                  </div>
                )}
              </form>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Response Time:</strong> I typically respond within 48 hours. For urgent matters, feel free to
                  reach out via email or phone directly.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
