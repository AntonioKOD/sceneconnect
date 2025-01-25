import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Paintbrush, Users, Zap, Shield } from "lucide-react"

const features = [
  {
    title: "Customizable Scenes",
    description: "Create unique experiences for your audience",
    icon: Paintbrush,
  },
  {
    title: "Engaged Community",
    description: "Connect with fans who share your passions",
    icon: Users,
  },
  {
    title: "Powerful Tools",
    description: "Access analytics and monetization features",
    icon: Zap,
  },
  {
    title: "Secure Platform",
    description: "Your content and data are always protected",
    icon: Shield,
  },
]

export function Features() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose SceneMatch?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="flex flex-col h-full">
              <CardHeader>
                <feature.icon className="w-12 h-12 mb-4 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

