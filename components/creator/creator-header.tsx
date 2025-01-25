import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Twitter, Instagram} from "lucide-react";
import { subscribeToCreator, isSubscriber, unSubscribe } from "@/app/actions";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface CreatorHeaderProps {
  creator: {
    id: string;
    name: string;
    twitter?: string;
    instagram?: string;
    onlyfans?: string;
    profileImage?: string;
  };
}

export function CreatorHeader({ creator }: CreatorHeaderProps) {
  const { data: session } = useSession();
  const subscriberId = session?.user?.id;
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  console.log(creator)
  useEffect(() => {
    const checkSubscription = async () => {
      if (subscriberId) {
        const result = await isSubscriber(creator.id, subscriberId);
        setIsSubscribed(result);
      }
    };
    checkSubscription();
    setImageUrl(creator?.profileImage || "/default-avatar.png");

    console.log("Profile Image URL:", creator?.profileImage);
  }, [creator.id, subscriberId, creator?.profileImage]);

  const handleSubscribe = async () => {
    if (subscriberId) {
      await subscribeToCreator(creator.id, subscriberId);
      setIsSubscribed(true);
    }
  };

  const handleUnsubscribe = async () => {
    if (subscriberId) {
      await unSubscribe(creator.id, subscriberId);
      setIsSubscribed(false);
    }
  };

  return (
    <div className="container mx-auto px-4">
  <div className="relative flex flex-col md:flex-row items-center md:items-end">
    {/* Profile Image */}
    <Avatar className="h-24 w-24 mr-4">
      <AvatarImage alt={creator.name} src={imageUrl} />
      <AvatarFallback>{creator.name.charAt(0)}</AvatarFallback>
    </Avatar>
    
    {/* Creator Info */}
    <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
      <h1 className="text-3xl font-bold">{creator.name}</h1>
    </div>

    {/* Action Buttons */}
    <div className="mt-4 md:mt-0 md:ml-auto flex space-x-2">
      {creator.twitter && (
        <Button variant="outline" size="icon" asChild>
          <a href={creator.twitter} target="_blank" rel="noopener noreferrer">
            <Twitter className="h-4 w-4" />
          </a>
        </Button>
      )}
      {creator.instagram && (
        <Button variant="outline" size="icon" asChild>
          <a href={creator.instagram} target="_blank" rel="noopener noreferrer">
            <Instagram className="h-4 w-4" />
          </a>
        </Button>
      )}

      {session && !isSubscribed && subscriberId && (
        <Button onClick={handleSubscribe}>Subscribe</Button>
      )}
      {session && isSubscribed && subscriberId && (
        <Button onClick={handleUnsubscribe}>Unsubscribe</Button>
      )}
    </div>
  </div>
</div>
  );
}