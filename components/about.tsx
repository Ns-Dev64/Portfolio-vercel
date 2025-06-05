import { Card, CardContent } from "@/components/ui/card"

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
        <Card>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4">My Journey</h3>
                <p className="text-muted-foreground mb-4">
                  I'm a Computer Science Engineering student and fullstack developer with a strong passion for backend
                  development. My journey in tech has been focused on building robust, scalable applications and solving
                  complex technical challenges. Through my internships at Techplement and DeepThought Edutech, I've
                  gained hands-on experience in developing high-performance systems and EdTech solutions.
                </p>
                <p className="text-muted-foreground mb-4">
                  While I enjoy working across the full stack, I'm particularly drawn to backend architecture, API
                  development, and performance optimization. I have experience with modern technologies like Bun.js,
                  Node.js, and various databases, always focusing on creating efficient and maintainable solutions.
                </p>
                <p className="text-muted-foreground">
                  When I'm not coding, you'll find me exploring new technologies, gaming, working out or pursuing my hobbies that keep me creative and inspired.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Quick Facts</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>🎓 BTech Computer Science Engineering Student</li>
                    <li>💼 Fullstack Developer with Backend Focus</li>
                    <li>🔧 Performance Optimization Enthusiast</li>
                    <li>🌱 Love New Technologies</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
