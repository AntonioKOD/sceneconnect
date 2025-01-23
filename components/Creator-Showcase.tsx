import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const creators = [
  {
    name: "Emma Johnson",
    description: "Travel vlogger exploring hidden gems around the world",
    image: "/creators/emma-johnson.jpg",
  },
  {
    name: "Alex Chen",
    description: "Tech enthusiast sharing the latest gadget reviews",
    image: "/creators/alex-chen.jpg",
  },
  {
    name: "Sophia Rodriguez",
    description: "Fitness trainer specializing in home workouts",
    image: "/creators/sophia-rodriguez.jpg",
  },
  {
    name: "Marcus Taylor",
    description: "Indie musician creating original songs and covers",
    image: "/creators/marcus-taylor.jpg",
  },
]

export function CreatorShowcase() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Creators</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {creators.map((creator) => (
          <Card key={creator.name} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>{creator.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={creator.image || "/placeholder.svg"}
                  alt={creator.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <CardDescription>{creator.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={`/creator/${creator.name.toLowerCase().replace(" ", "-")}`}>View Profile</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

