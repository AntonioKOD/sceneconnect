'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { SiOnlyfans } from "react-icons/si";

import Link from "next/link";

interface CreatorHeaderProps {
  user: {
    name: string
      twitter?: string
      instagram?: string
      onlyfans?: string
    
    
  }
}

export function CreatorHeader({ user }: CreatorHeaderProps) {
  

  return (
    <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
      <div className="flex items-center mb-4 md:mb-0">
        <Avatar className="h-24 w-24 mr-4">
          <AvatarImage alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">Creator</p>
        </div>
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

