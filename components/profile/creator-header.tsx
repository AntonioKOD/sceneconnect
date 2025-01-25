'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { SiOnlyfans } from "react-icons/si";
import { CldUploadWidget } from "next-cloudinary";



import Link from "next/link";
import { setProfilePicture } from "@/app/actions";

interface CreatorHeaderProps {
  user: {
    name: string
      twitter?: string
      instagram?: string
      onlyfans?: string
      profileImage?: string
  }
}

export function CreatorHeader({ user }: CreatorHeaderProps) {
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleUpload = (result: any) => {
      const secureUrl = result?.info?.secure_url;
      if (secureUrl) {
        setProfilePicture(user.name, secureUrl)
      }
    };

  return (
    <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
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

  {/* Creator Info */}
  <div>
    <h1 className="text-3xl font-bold">{user.name}</h1>
    <p className="text-muted-foreground">Creator</p>
  </div>
      <div className="flex space-x-2">
        {user.twitter && (
          <Button variant="outline" size="icon" asChild>
            <a href={user.twitter} target="_blank" rel="noopener noreferrer">
              <FaTwitter className="h-4 w-4" />
            </a>
          </Button>
        )}
        {user.instagram && (
          <Button variant="outline" size="icon" asChild>
            <a href={user.instagram} target="_blank" rel="noopener noreferrer">
              <FaInstagram className="h-4 w-4" />
            </a>
          </Button>
        )}
        {user.onlyfans && (
          <Button variant="outline" size="icon" asChild>
            <a href={user.onlyfans} target="_blank" rel="noopener noreferrer">
              <SiOnlyfans className="h-4 w-4" />
            </a>
          </Button>
        )}
        <Link href='/subscribers'><Button>Subscribers</Button></Link>
      </div>
    </div>
  )
}

