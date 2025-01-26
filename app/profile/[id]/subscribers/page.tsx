"use client"

import { useSession } from "next-auth/react"
import { getSubscribers } from "@/app/actions"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"


interface Subscriber {
  id: string
  name: string
  image?: string
}

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { data: session } = useSession()
  const userId = session?.user?.id

  useEffect(() => {
    async function fetchSubscribers() {
      if (userId) {
        try {
          setLoading(true)
          const data = await getSubscribers(userId)
          setSubscribers(data)
        } catch (err) {
          console.error("Failed to fetch subscribers:", err)
          setError("Failed to load subscribers. Please try again later.")
        } finally {
          setLoading(false)
        }
      }
    }
    fetchSubscribers()
  }, [userId])

  if (error) {
    return (
      <Card className="max-w-2xl mx-auto mt-8">
        <CardContent className="pt-6">
          <p className="text-center text-red-500">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Your Subscribers</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            ))}
          </div>
        ) : subscribers.length > 0 ? (
          <ul className="space-y-4">
            {subscribers.map((subscriber) => (
              <li key={subscriber.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={subscriber.image} alt={subscriber.name} />
                    <AvatarFallback>{subscriber.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{subscriber.name}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">You don&apos;t have any subscribers yet.</p>
        )}
      </CardContent>
    </Card>
  )
}

