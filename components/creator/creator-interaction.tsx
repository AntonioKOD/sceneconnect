"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"

interface CreatorInteractionProps {
  creatorId: string
}

export function CreatorInteraction({ creatorId }: CreatorInteractionProps) {
  const [message, setMessage] = useState("")

  const handleSendMessage = () => {
    // Implement message sending logic here
    console.log("Sending message to creator:", creatorId, message)
    setMessage("")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send a Message</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Write a message to the creator..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mb-4"
        />
        <Button onClick={handleSendMessage} className="w-full">
          <Send className="mr-2 h-4 w-4" /> Send Message
        </Button>
      </CardContent>
    </Card>
  )
}

