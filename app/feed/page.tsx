"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchPosts } from "@/app/actions"
import { formatDistanceToNow } from "date-fns"

interface Post {
  id: string
  content: string
  createdAt: string
  author: {
    name: string
    image?: string
  }
}

export default function SubscriberFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    getPosts()
  }, [])

  async function getPosts(pageNumber = 1) {
    setLoading(true)
    try {
      const data = await fetchPosts()
      if (pageNumber === 1) {
        setPosts(data.map(post => ({ ...post, createdAt: post.createdAt.toISOString() })))
      } else {
        setPosts((prevPosts) => [
          ...prevPosts,
          ...data.map(post => ({ ...post, createdAt: post.createdAt.toISOString() }))
        ])
      }
      setHasMore(data.length === 10) // Assuming 10 posts per page
      setPage(pageNumber)
    } catch (error) {
      console.error("Failed to fetch posts:", error)
    } finally {
      setLoading(false)
    }
  }

  function loadMore() {
    if (!loading && hasMore) {
      getPosts(page + 1)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Feed</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden transition-shadow hover:shadow-lg">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage src={post.author.image} alt={post.author.name} />
                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{post.author.name}</CardTitle>
                <CardDescription>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
            </CardContent>
          </Card>
        ))}
        {loading && (
          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                  <Skeleton className="h-10 w-10 rounded-full mr-4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-3 w-[150px]" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      {hasMore && (
        <div className="mt-6 text-center">
          <Button onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  )
}
