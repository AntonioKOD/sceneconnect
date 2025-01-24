'use client'
import { notFound, useParams } from "next/navigation"
import { CreatorProfileView } from "@/components/creator/creator-profile"
import { useEffect, useState } from "react"
import { displayProfile } from "@/app/actions"

interface CreatorProfile {
  id: string
    name: string
    bio: string | null
    twitter?: string | null
    instagram?: string | null
    onlyfans?: string | null
}


export default function CreatorProfilePage() {
  const {id} = useParams()
    const [profile, setProfile] = useState<CreatorProfile | null>(null)
    const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfile(){
        if(!id)return
        const creatorProfile = await displayProfile(id as string);
        setProfile(creatorProfile)
        setLoading(false)

    }
    fetchProfile()
    }, [id])


    if(loading){ return <div>Loading...</div>}
    if(!profile){ return notFound()}

    const creator = {
      id: profile.id,
      name: profile.name,
      bio: profile.bio ?? '',
     twitter: profile.twitter ?? undefined,
    instagram: profile.instagram ?? undefined
    }

  return <CreatorProfileView creator={creator}/>
}

