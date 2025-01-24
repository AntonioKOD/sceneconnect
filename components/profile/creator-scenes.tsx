"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import Link from "next/link"
import { fetchCreatorScenes } from "@/app/actions"
import { CalendarIcon, ThumbsUpIcon } from "lucide-react"

enum SceneStatus {
  Draft = "Draft",
  Published = "Published",
  Archived = "Archived",
}

interface Scene {
  id: string
  title: string
  description: string
  status: SceneStatus
  createdAt: Date
  updatedAt: Date
  fundingGoal: number
  currentFunding: number
  nicheTags: string[]
  voteCount: number
  videoUrl: string | null
  creatorId: string
  creator: {
    name: string
  }
}

interface CreatorScenesProps {
  userId: string
}

export function CreatorScenes({ userId }: CreatorScenesProps) {
  const [scenes, setScenes] = useState<Scene[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCreatorScenes(userId)
      .then((fetchedScenes) => {
        const mappedScenes = fetchedScenes.map((scene) => ({
          ...scene,
          status: SceneStatus[scene.status as keyof typeof SceneStatus],
        }))
        setScenes(mappedScenes)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Failed to fetch scenes:", err)
        setLoading(false)
      })
  }, [userId])

  if (loading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>My Scenes</CardTitle>
          <Skeleton className="h-10 w-[140px]" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-[200px] w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>My Scenes</CardTitle>
        <Button asChild>
          <Link href="/scenes/create">Create New Scene</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scenes.map((scene) => (
            <Card key={scene.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image src={scene.videoUrl || "/placeholder.svg"} alt={scene.title} layout="fill" objectFit="cover" />
                <div className="absolute top-2 right-2">
                  <Badge variant={scene.status === "Published" ? "default" : "secondary"}>{scene.status}</Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{scene.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{scene.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Funding Progress</span>
                    <span>{Math.round((scene.currentFunding / scene.fundingGoal) * 100)}%</span>
                  </div>
                  <Progress value={(scene.currentFunding / scene.fundingGoal) * 100} />
                </div>
                <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex space-x-2">
                    <span className="flex items-center">
                      <CalendarIcon className="w-4 h-4 mr-1" />
                      {new Date(scene.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <ThumbsUpIcon className="w-4 h-4 mr-1" />
                      {scene.voteCount}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/scenes/${scene.id}`}>View Details</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

