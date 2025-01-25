import { CreatorHeader } from "./creator-header"
import { CreatorBio } from "./creator-bio"
import { CreatorContent } from "./creator-content"
import { CreatorInteraction } from "./creator-interaction"

interface Creator {
  id: string
  name: string
  bio: string
twitter?: string
instagram?: string
 onlyfans?: string
 
  
}

interface CreatorProfileViewProps {
  creator: Creator
}

export function CreatorProfileView({ creator }: CreatorProfileViewProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <CreatorHeader creator={creator} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2 space-y-8">
          <CreatorBio creator={creator} />
          <CreatorContent/>
        </div>
        <div className="space-y-8">
          <CreatorInteraction creatorId={creator.id} />
        </div>
      </div>
    </div>
  )
}

