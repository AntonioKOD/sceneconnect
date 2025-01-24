import { FanHeader } from "./fan-header"
import { SubscribedCreators } from "./subscribed-creators"
import { FundedScenes } from "./funded-scenes"
import { FanSettings } from "./fan-settings"
import { FanActivity } from "./fan-activity"

interface FanProfileProps {
  user: {
    id: string
    name: string
    email: string
    role: string
    avatarUrl: string
  }
}

export function FanProfile({ user }: FanProfileProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <FanHeader user={user} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2 space-y-8">
          <SubscribedCreators userId={user.id} />
          <FundedScenes userId={user.id}/>
          <FanActivity userId={user.id} />
        </div>
        <div>
          <FanSettings user={user} />
        </div>
      </div>
    </div>
  )
}

