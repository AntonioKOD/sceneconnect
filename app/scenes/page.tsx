"use client"

import React from "react"
import { fetchScenes } from "../actions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { CalendarIcon, ThumbsUpIcon, VideoIcon } from "lucide-react"

enum SceneStatus {
  Draft = "IDEA",
  Published = "COMPLETED",
  Progress = "IN_PROGRESS",
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

export default function Scenes() {
  const [scenes, setScenes] = React.useState<Scene[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    fetchScenes()
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
        setError("Failed to load scenes. Please try again later.")
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Explore Scenes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-6 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full mb-4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3 mt-2" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Explore Scenes</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Explore Scenes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenes.map((scene) => (
          <Card key={scene.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{scene.title}</CardTitle>
              <CardDescription>by {scene.creator.name}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-500 mb-4 line-clamp-3">{scene.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {scene.nicheTags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Funding Progress</span>
                  <span>{Math.round((scene.currentFunding / scene.fundingGoal) * 100)}%</span>
                </div>
                <Progress value={(scene.currentFunding / scene.fundingGoal) * 100} />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>${scene.currentFunding.toLocaleString()} raised</span>
                  <span>Goal: ${scene.fundingGoal.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex space-x-2 text-sm text-gray-500">
                <span className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  {new Date(scene.createdAt).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <ThumbsUpIcon className="w-4 h-4 mr-1" />
                  {scene.voteCount}
                </span>
                {scene.videoUrl && (
                  <span className="flex items-center">
                    <VideoIcon className="w-4 h-4 mr-1" />
                    Video
                  </span>
                )}
              </div>
              <Button asChild>
                <Link href={`/scenes/${scene.id}`}>View Scene</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

