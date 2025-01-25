'use client'
import { setProfilePicture } from "@/app/actions"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CldUploadWidget } from "next-cloudinary"

interface FanHeaderProps {
  user: {
    name: string
    profileImage?: string
  }
}

export function FanHeader({ user }: FanHeaderProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpload = (result: any) => {
      const secureUrl = result?.info?.secure_url;
      if(secureUrl){
        setProfilePicture(user.name, secureUrl)
      }
  }
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
      <div className="flex items-center mb-4 sm:mb-0">
      <div className="relative">
    <Avatar className="h-24 w-24 mr-4">
      <AvatarImage alt={user.name} src={user.profileImage} />
      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
    </Avatar>

    {/* Upload Overlay Button (Hidden by Default) */}
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={handleUpload}
      >
        {({ open }) => (
          <Button
            onClick={() => open()}
            className="text-white text-sm font-semibold bg-gray-800 bg-opacity-70 px-3 py-2 rounded-md hover:bg-opacity-90 transition"
          >
            Upload
          </Button>
        )}
      </CldUploadWidget>
    </div>
  </div>
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">Fan</p>
        </div>
      </div>
      <Button>Edit Profile</Button>
    </div>
  )
}

