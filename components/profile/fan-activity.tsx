"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { fetchSubscriptions } from "@/app/actions"


interface Activity {
  id: string
  creatorName: string
  creatorAvatar: string
  date: string
}

interface FanActivityProps {
  userId: string
}

export function FanActivity({ userId }: FanActivityProps) {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    fetchSubscriptions(userId)
      .then((fetchedActivities) => {
        const mappedActivities = fetchedActivities.map((item) => {
        
          return {
            id: item.id,
            creatorName: item.creator.name,
            creatorAvatar: item.creator.profileImage || "",
            date: new Date(item.startDate).toLocaleDateString()
          }
        })
        setActivities(mappedActivities)
      })
      .catch((err) => {
        console.error("Failed to fetch fan activities:", err)
      })
  }, [userId])


  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={activity.creatorAvatar} alt={activity.creatorName} />
                <AvatarFallback>{activity.creatorName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-meidum">You subscribed to {activity.creatorName} on {activity.date}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

