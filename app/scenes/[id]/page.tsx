"use client";
import { viewScene, fundScene } from "@/app/actions";
import React from "react";
import {Button} from "@/components/ui/button";
import { useSession } from "next-auth/react";

enum SceneStatus {
  Draft = "IDEA",
  Published = "COMPLETED",
  Progress = "IN_PROGRESS",
}

interface Scene {
  title: string;
  description: string;
  status: SceneStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
  fundingGoal: number;
  currentFunding: number;
  nicheTags: string[];
  voteCount: number;
  videoUrl: string | null;
  creatorId: string;
  creator: {
    name: string;
  };
}

export default function FundingPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params); // ✅ Unwrap params
  const { id } = resolvedParams;
    const { data: session } = useSession();
    const user = session?.user;

  
  const [scene, setScene] = React.useState<Scene | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchScene() {
      try {
        const fetchedScene = await viewScene(id);
        if (!fetchedScene) {
          throw new Error("Scene not found");
        }
        setScene({
          ...fetchedScene,
          status: SceneStatus[fetchedScene.status as keyof typeof SceneStatus], // Ensure status is mapped correctly
        });
      } catch (err) {
        console.error("Failed to fetch scene:", err);
        setError("Failed to load scene. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchScene();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    scene && (
      <div className="p-6 bg-white shadow-md rounded-lg max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold">{scene.title}</h1>
        <p className="text-gray-600">{scene.description}</p>
        <p><strong>Creator:</strong> {scene.creator.name}</p>
        <p><strong>Status:</strong> {scene.status}</p>
        <p><strong>Created:</strong> {new Date(scene.createdAt).toLocaleDateString()}</p>
        <p><strong>Updated:</strong> {new Date(scene.updatedAt).toLocaleDateString()}</p>
        <p><strong>Funding Goal:</strong> ${scene.fundingGoal}</p>
        <p><strong>Current Funding:</strong> ${scene.currentFunding}</p>
        <p><strong>Votes:</strong> {scene.voteCount}</p>
        <p><strong>Tags:</strong> {scene.nicheTags.length > 0 ? scene.nicheTags.join(", ") : "None"}</p>
        <Button onClick={() => user?.id && fundScene(user.id, id, 10)}>Fund Scene</Button>
        {scene.videoUrl && (
          <p>
            <strong>Video:</strong> <a href={scene.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Watch</a>
          </p>
        )}
      </div>
    )
  );
}