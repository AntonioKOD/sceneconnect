"use client"

import { viewScene, fundScene } from "@/app/actions"
import React from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { CalendarIcon, ThumbsUpIcon, VideoIcon } from "lucide-react"

enum SceneStatus {
  Draft = "IDEA",
  Published = "COMPLETED",
  Progress = "IN_PROGRESS",
}

interface Scene {
  title: string
  description: string
  status: SceneStatus
  createdAt: string | Date
  updatedAt: string | Date
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

export default function FundingPage({ params }: { params: Promise<{ id: string }> }) {
const {toast} = useToast()
  const resolvedParams = React.use(params)
  const { id } = resolvedParams
  const { data: session } = useSession()
  const user = session?.user

  const [scene, setScene] = React.useState<Scene | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [isFunding, setIsFunding] = React.useState(false)

  React.useEffect(() => {
    async function fetchScene() {
      try {
        const fetchedScene = await viewScene(id)
        if (!fetchedScene) {
          throw new Error("Scene not found")
        }
        setScene({
          ...fetchedScene,
          status: SceneStatus[fetchedScene.status as keyof typeof SceneStatus],
        })
      } catch (err) {
        console.error("Failed to fetch scene:", err)
        setError("Failed to load scene. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchScene()
  }, [id])

  const handleFunding = async () => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to fund a scene.",
        variant: "destructive",
      })
      return
    }
    setIsFunding(true)
    try {
      await fundScene(user.id, id, 10)
      toast({
        title: "Success",
        description: "You have successfully funded this scene!",
      })
      // Refresh scene data after funding
      const updatedScene = await viewScene(id)
      if (updatedScene) {
        setScene({
          ...updatedScene,
          status: SceneStatus[updatedScene.status as keyof typeof SceneStatus],
          title: updatedScene.title || "",
          description: updatedScene.description || "",
          createdAt: updatedScene.createdAt || new Date(),
          updatedAt: updatedScene.updatedAt || new Date(),
          fundingGoal: updatedScene.fundingGoal || 0,
          currentFunding: updatedScene.currentFunding || 0,
          nicheTags: updatedScene.nicheTags || [],
          voteCount: updatedScene.voteCount || 0,
          videoUrl: updatedScene.videoUrl || null,
          creatorId: updatedScene.creatorId || "",
          creator: updatedScene.creator || { name: "" },
        })
      }
    } catch (err) {
      console.error("Failed to fund scene:", err)
      toast({
        title: "Error",
        description: "Failed to fund the scene. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsFunding(false)
    }
  }

  if (loading) {
    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!scene) return null

  const fundingProgress = (scene.currentFunding / scene.fundingGoal) * 100

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-3xl font-bold mb-2">{scene.title}</CardTitle>
            <p className="text-sm text-muted-foreground">by {scene.creator.name}</p>
          </div>
          <Badge variant={scene.status === SceneStatus.Published ? "default" : "secondary"}>{scene.status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-gray-600">{scene.description}</p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Funding Progress</span>
            <span>{fundingProgress.toFixed(2)}%</span>
          </div>
          <Progress value={fundingProgress} />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${scene.currentFunding.toLocaleString()} raised</span>
            <span>Goal: ${scene.fundingGoal.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {scene.nicheTags.map((tag, index) => (
            <Badge key={index} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Created: {new Date(scene.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Updated: {new Date(scene.updatedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <ThumbsUpIcon className="mr-2 h-4 w-4" />
            <span>Votes: {scene.voteCount}</span>
          </div>
          {scene.videoUrl && (
            <div className="flex items-center">
              <VideoIcon className="mr-2 h-4 w-4" />
              <a
                href={scene.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Watch Video
              </a>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="w-full" disabled={isFunding}>
              {isFunding ? "Processing..." : "Fund Scene ($10)"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Fund this Scene?</AlertDialogTitle>
              <AlertDialogDescription>
                You are about to fund &quot;{scene.title}&quot; with $10. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleFunding}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}

