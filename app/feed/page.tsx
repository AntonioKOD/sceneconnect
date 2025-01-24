'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchPosts } from '@/app/actions';

interface Post {
  id: string;
  content: string;
  createdAt: string;
  author: {
    name: string;
  };
}

export default function SubscriberFeed() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function getPosts() {
      const data = await fetchPosts();
      setPosts(data.map(post => ({
        ...post,
        createdAt: post.createdAt.toISOString()
      })));
    }

    getPosts();
  }, []);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{post.author.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
            <p className="text-sm text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}