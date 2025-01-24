'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { createPost } from '@/app/actions';

interface CreatorCommunicationProps {
  userId: string;
}

export function CreatorCommunication({ userId }: CreatorCommunicationProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await createPost(formData);
    setMessage(''); // Reset the message field
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="authorId" value={userId} />
          <Textarea
            name="content"
            placeholder="Write a message to your fans..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mb-4"
          />
          <Button type="submit" className="w-full">
            Create Post
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}