import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"

export function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>

        <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto">
          I'm always open to discussing new opportunities, backend development challenges, or collaborating on
          interesting projects. Whether it's about performance optimization, API development, or EdTech solutions, feel
          free to reach out!
        </p>

        <div className="space-y-6 mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 rounded-lg bg-background/50">
            <Mail className="h-6 w-6 text-primary flex-shrink-0" />
            <span className="text-lg">yashsingh990765@gmail.com</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 rounded-lg bg-background/50">
            <Phone className="h-6 w-6 text-primary flex-shrink-0" />
            <span className="text-lg">+91 9886590699</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 rounded-lg bg-background/50">
            <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
            <span className="text-lg">Hospet, Karnataka, India</span>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <Button variant="outline" size="lg" className="h-14 w-14" asChild>
            <a href="https://github.com/Ns-Dev64" target="_blank" rel="noopener noreferrer">
              <Github className="h-6 w-6" />
            </a>
          </Button>
          <Button variant="outline" size="lg" className="h-14 w-14" asChild>
            <a href="https://www.linkedin.com/in/navaneet-singh-7a7a5627b" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-6 w-6" />
            </a>
          </Button>
          <Button variant="outline" size="lg" className="h-14 w-14" asChild>
            <a href="mailto:yashsingh990765@gmail.com">
              <Mail className="h-6 w-6" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
