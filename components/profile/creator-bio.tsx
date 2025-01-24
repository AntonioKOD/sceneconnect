import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CreatorBioProps {
  user: {
    bio: string
  }
}

export function CreatorBio({ user }: CreatorBioProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About Me</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{user.bio || "This creator hasn't added a bio yet."}</p>
      </CardContent>
    </Card>
  )
}

