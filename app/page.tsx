import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CreatorShowcase } from "@/components/Creator-Showcase"
import { Features } from "@/components/Features"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center py-28 md:py-40">
          <Image src="/hero-background.jpg" alt="SceneConnect Hero" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 text-white max-w-3xl px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">SceneConnect</h1>
            <p className="text-lg md:text-xl mb-8">Where Your Passions Come to Life</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/creator-signup">Craft Your Scene</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/fan-signup">Join as a Fan</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Creator Showcase */}
        <CreatorShowcase />

        {/* Features Section */}
        <Features />

        {/* Call to Action Sections */}
        <section className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>For Creators</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Start crafting scenes that your audience loves</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" asChild>
                  <Link href="/creator-signup">Start Creating</Link>
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>For Fans</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Discover scenes tailored to your passions</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" asChild>
                  <Link href="/fan-signup">Start Exploring</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

