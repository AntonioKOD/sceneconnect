import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface FanHeaderProps {
  user: {
    name: string
    avatarUrl: string
  }
}

export function FanHeader({ user }: FanHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
      <div className="flex items-center mb-4 sm:mb-0">
        <Avatar className="h-24 w-24 mr-4">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">Fan</p>
        </div>
      </div>
      <Button>Edit Profile</Button>
    </div>
  )
}

