import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // ✅ Import from shared auth.ts
import { notFound } from "next/navigation";
import { CreatorProfile } from "@/components/profile/creator-profile";
import { FanProfile } from "@/components/profile/fan-profile";

interface ProfilePageProps {
  params: Promise<{ id: string }>; // ✅ Ensure params is a Promise
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const resolvedParams = await params; // ✅ Await params
  const { id } = resolvedParams; 

  if (!id) {
    return notFound();
  }

  // ✅ Fetch session on the server
  const session = await getServerSession(authOptions);
  if (!session) {
    return notFound(); // Handle unauthorized access
  }

  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/profile/${id}`, {
      cache: "no-store", // ✅ Ensures fresh data in production
      headers: {
        Cookie: "", // ✅ Ensures cookies are forwarded properly
      },
    });

    if (!res.ok) {
      return notFound();
    }

    const { user } = await res.json();

    return user.role === "CREATOR" && user.id === session.user.id ? (
      <CreatorProfile user={user} />
    ) : (
      <FanProfile user={user} />
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return notFound();
  }
}