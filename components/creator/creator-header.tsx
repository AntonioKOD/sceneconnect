import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Twitter, Instagram} from "lucide-react";
import Image from "next/image";
import { subscribeToCreator, isSubscriber, unSubscribe } from "@/app/actions";
import { useSession } from "next-auth/react";

interface CreatorHeaderProps {
  creator: {
    id: string;
    name: string;
    twitter?: string;
    instagram?: string;
    onlyfans?: string;
  };
}

export function CreatorHeader({ creator }: CreatorHeaderProps) {
  const { data: session } = useSession();
  const subscriberId = session?.user?.id;
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      if (subscriberId) {
        const result = await isSubscriber(creator.id, subscriberId);
        setIsSubscribed(result);
      }
    };
    checkSubscription();
  }, [creator.id, subscriberId]);

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
    <div className="relative">
      <div className="h-48 md:h-64 overflow-hidden">
        <Image
          src={"/placeholder.svg"}
          alt={`${creator.name}'s banner`}
          width={1200}
          height={400}
          className="w-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent h-24" />
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-20">
          <Image
            src={"/placeholder.svg"}
            alt={creator.name}
            width={128}
            height={128}
            className="rounded-full border-4 border-background"
          />
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <h1 className="text-3xl font-bold">{creator.name}</h1>
          </div>
          <div className="mt-4 md:mt-0 md:ml-auto flex space-x-2">
            {creator.twitter && (
              <Button variant="outline" size="icon" asChild>
                <a
                  href={creator.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
            )}
            {creator.instagram && (
              <Button variant="outline" size="icon" asChild>
                <a
                  href={creator.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
    </div>
  );
}