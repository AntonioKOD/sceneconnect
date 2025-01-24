"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

interface Scene {
  id: string
  title: string
  thumbnailUrl: string
  views: number
}


export function CreatorContent() {
  const [scenes] = useState<Scene[]>([
    { id: "1", title: "Sunset Serenade", thumbnailUrl: "/scenes/scene1.jpg", views: 1000 },
    { id: "2", title: "Tech Talk", thumbnailUrl: "/scenes/scene2.jpg", views: 1500 },
    { id: "3", title: "Fitness Challenge", thumbnailUrl: "/scenes/scene3.jpg", views: 2000 },
    { id: "4", title: "Cooking Masterclass", thumbnailUrl: "/scenes/scene4.jpg", views: 1800 },
    { id: "5", title: "Travel Vlog: Paris", thumbnailUrl: "/scenes/scene5.jpg", views: 2500 },
    { id: "6", title: "Gaming Stream Highlights", thumbnailUrl: "/scenes/scene6.jpg", views: 3000 },
  ])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="scenes">
          <TabsList className="mb-4">
            <TabsTrigger value="scenes">Scenes</TabsTrigger>
            <TabsTrigger value="series">Series</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
          </TabsList>
          <TabsContent value="scenes">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {scenes.map((scene) => (
                <div key={scene.id} className="relative group overflow-hidden rounded-md">
                  <Image
                    src={scene.thumbnailUrl || "/placeholder.svg"}
                    alt={scene.title}
                    width={300}
                    height={200}
                    className="object-cover w-full h-48 transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <h3 className="text-white font-bold text-lg">{scene.title}</h3>
                    <p className="text-white text-sm">{scene.views} views</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="series">
            <p>No series available yet.</p>
          </TabsContent>
          <TabsContent value="posts">
            <p>No posts available yet.</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

