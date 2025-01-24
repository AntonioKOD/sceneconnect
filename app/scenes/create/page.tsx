'use client'
import CreateScene  from "@/components/scenes/create-scene"
import { useSession } from "next-auth/react"

export default function CreateScenePage() {
  const { data: session } = useSession()
  const creatorId = session?.user?.id || ""
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Create Your New Scene</h1>
      <p className="text-muted-foreground mb-8">
        Bring your creative vision to life. Fill out the details below to start your journey and connect with your
        audience.
      </p>
      <CreateScene creatorId={creatorId}/>
    </div>
  )
}

