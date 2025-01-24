import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CreatorBioProps {
  creator: {
    bio: string
  }
}

export function CreatorBio({ creator }: CreatorBioProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{creator.bio}</p>
      </CardContent>
    </Card>
  )
}

