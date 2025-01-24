'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { updateProfile } from '@/app/actions';

interface CreatorProfileUpdateProps {
  user: {
    id: string;
    name: string;
    bio: string;
      twitter?: string;
      instagram?: string;
      onlyfans?: string;
  };
}

export function CreatorProfileUpdate({ user }: CreatorProfileUpdateProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={updateProfile} className="space-y-4">
          <input type="hidden" name="id" value={user.id} />
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={user.name} />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" name="bio" defaultValue={user.bio} />
          </div>
          <div>
            <Label htmlFor="twitter">Twitter</Label>
            <Input id="twitter" name="twitter" defaultValue={user.twitter} />
          </div>
          <div>
            <Label htmlFor="instagram">Instagram</Label>
            <Input id="instagram" name="instagram" defaultValue={user.instagram} />
          </div>
          <div>
            <Label htmlFor="onlyfans">OnlyFans</Label>
            <Input id="onlyfans" name="onlyfans" defaultValue={user.onlyfans} />
          </div>
          <button type="submit" className="w-full">
            Update Profile
          </button>
        </form>
      </CardContent>
    </Card>
  );
}