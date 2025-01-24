import { CreatorHeader } from "./creator-header"
import { CreatorBio } from "./creator-bio"
import { CreatorScenes } from "./creator-scenes"

import { CreatorCommunication } from "./creator-communication"
import { CreatorProfileUpdate } from "./creator-profile-update"

interface CreatorProfileProps {
  user: {
    id: string
    name: string
    email: string
    bio: string
      twitter?: string
      instagram?: string
      onlyfans?: string
    
  }
}

export function CreatorProfile({ user }: CreatorProfileProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <CreatorHeader user={user} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2 space-y-8">
          <CreatorBio user={user} />
          <CreatorScenes userId={user.id} />
        </div>
        <div className="space-y-8">
          <CreatorCommunication userId={user.id} />
          <CreatorProfileUpdate user={user} />
        </div>
      </div>
    </div>
  )
}

