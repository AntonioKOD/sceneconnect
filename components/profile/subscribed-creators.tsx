"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { fetchSubscriptions } from "@/app/actions"

interface Creator {
  id: string
  name: string
  avatarUrl: string
}

interface SubscribedCreatorsProps {
  userId: string
}

export function SubscribedCreators({ userId }: SubscribedCreatorsProps) {
  const [creators, setCreators] = useState<Creator[]>([])

  useEffect(() => {
    fetchSubscriptions(userId)
      .then((fetchedCreators) => {
        const mappedCreators = fetchedCreators.map((item) => ({
          id: item.creator.id,
          name: item.creator.name,
          avatarUrl: item.creator.profileImage || ""
        }));
        setCreators(mappedCreators)
      })
      .catch((err) => {
        console.error("Failed to fetch subscribed creators:", err)
      })
  }, [userId])

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Subscribed Creators</CardTitle>
        <Button variant="ghost">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {creators.map((creator) => (
            <Link
              href={`/creator/${creator.id}`}
              key={creator.id}
              className="flex items-center p-2 hover:bg-muted rounded-md transition-colors"
            >
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage src={creator.avatarUrl} alt={creator.name} />
                <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{creator.name}</span>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

