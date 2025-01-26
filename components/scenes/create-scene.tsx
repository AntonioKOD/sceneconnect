"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { createScene } from "@/app/actions";
import { CldUploadWidget, CldVideoPlayer } from "next-cloudinary";
import React, { useState } from "react";

// Enum for Scene Status
enum SceneStatus {
  IDEA = "IDEA",
  PLANNING = "PLANNING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

// Define props for the component
interface CreateSceneProps {
  creatorId: string;
}

// Functional component for creating a scene
export default function CreateScene({ creatorId }: CreateSceneProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: SceneStatus.IDEA,
    fundingGoal: 0,
    nicheTags: "",
  });

  // Handle the video upload
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpload = (result: any) => {
    const secureUrl = result?.info?.secure_url;
    if (secureUrl) {
      setVideoUrl(secureUrl);
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sceneData = new FormData();
    sceneData.append("title", formData.title);
    sceneData.append("description", formData.description);
    sceneData.append("status", formData.status);
    sceneData.append("fundingGoal", formData.fundingGoal.toString());
    sceneData.append("nicheTags", formData.nicheTags);
    sceneData.append("creatorId", creatorId);
    if (videoUrl) {
      sceneData.append("videoUrl", videoUrl);
    }
    await createScene(sceneData);
    // Optionally, reset form or provide feedback to the user here
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a Scene</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Input */}
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          {/* Description Input */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>

          {/* Status Dropdown */}
          <div>
            <Label htmlFor="status">Status</Label>
            <Select name="status" value={formData.status} onValueChange={(value) => setFormData((prevData) => ({ ...prevData, status: value as SceneStatus }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(SceneStatus).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Funding Goal Input */}
          <div>
            <Label htmlFor="fundingGoal">Funding Goal</Label>
            <Input id="fundingGoal" name="fundingGoal" type="number" min="0" value={formData.fundingGoal} onChange={handleChange} required />
          </div>

          {/* Niche Tags Input */}
          <div>
            <Label htmlFor="nicheTags">Niche Tags</Label>
            <Input id="nicheTags" name="nicheTags" placeholder="Comma-separated tags" value={formData.nicheTags} onChange={handleChange} />
          </div>

          {/* Video Upload Button */}
          <div>
            <CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} onSuccess={handleUpload}>
              {({ open }) => {
                return <Button type="button" onClick={() => open()}>Upload Video</Button>;
              }}
            </CldUploadWidget>
            {videoUrl && (
              <CldVideoPlayer
                     width="1920"
                     height="1080"
                     src={videoUrl || ""}
                   />
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Create Scene
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}