import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // ✅ Import authOptions
import { notFound } from "next/navigation";
import { CreatorProfile } from "@/components/profile/creator-profile";
import { FanProfile } from "@/components/profile/fan-profile";

interface ProfilePageProps {
  params: { id: string };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  // ✅ Fetch session data on the server
  const session = await getServerSession(authOptions);
  const sessionUserId = session?.user?.id;

  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/profile/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      notFound();
    }

    const { user } = await res.json();

    return user.role === "CREATOR" && user.id === sessionUserId ? (
      <CreatorProfile user={user} />
    ) : (
      <FanProfile user={user} />
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    notFound();
  }
}