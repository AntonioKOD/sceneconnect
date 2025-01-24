"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { fetchPledges } from "@/app/actions";
import { PledgeStatus } from "@prisma/client"; // ✅ Import Prisma enums

interface Scene {
  id: string;
  title: string;
}

interface User {
  name: string;
}

interface Pledge {
  id: string;
  status: PledgeStatus;
  createdAt: string; // ✅ Ensure createdAt is string to avoid Date issues
  user: User;
  scene: Scene;
  amount: number;
}

interface FundedScenesProps {
 userId: string;
}

export function FundedScenes({ userId }: FundedScenesProps) {
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getPledges() {
      try {
        const fetchedPledges = await fetchPledges(userId);
        
        // ✅ Ensure createdAt is formatted correctly
        const formattedPledges = fetchedPledges.map((pledge) => ({
          ...pledge,
          createdAt: new Date(pledge.createdAt).toISOString(), // Ensure it's always a string
          scene: {
            ...pledge.scene,
            id: pledge.sceneId, // Ensure scene has id
          },
        }));

        setPledges(formattedPledges);
      } catch (err) {
        console.error("Error fetching pledges:", err);
        setError("Failed to load pledges.");
      } finally {
        setLoading(false);
      }
    }

    getPledges();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!pledges.length) return <div>No pledges yet.</div>;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Funded Scenes</CardTitle>
        <Button variant="ghost">View All</Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {pledges.map((pledge) => (
            <div key={pledge.id} className="relative group overflow-hidden rounded-md p-4 border">
              <h3 className="font-bold text-lg">{pledge.scene?.title || "Unknown Scene"}</h3>
              <p className="text-sm text-gray-500">Pledged by: {pledge.user?.name || "Anonymous"}</p>
              <p className="text-sm text-gray-500">Amount: ${pledge.amount.toFixed(2)}</p>
              <p className="text-xs text-gray-400">Status: {pledge.status}</p>
              <p className="text-xs text-gray-400">Date: {new Date(pledge.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}