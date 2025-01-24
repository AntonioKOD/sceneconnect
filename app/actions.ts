'use server'
import { PrismaClient, SceneStatus, PledgeStatus } from "@prisma/client"
import { revalidatePath } from "next/cache"




const prisma = new PrismaClient()
interface Scene {
  id: string;
  title: string;
  description: string;
  status: "IDEA" | "IN_PROGRESS" | "COMPLETED";
  createdAt: Date;
  updatedAt: Date;
  fundingGoal: number;
  currentFunding: number;
  nicheTags: string[];
  voteCount: number;
  videoUrl: string | null;
  creatorId: string;
  creator: {
    id: string;
    name: string;
  };
}



export async function updateProfile(
    formData: FormData
): Promise<void> {
    // Update profile
    const id = formData.get("id") as string
    const name = formData.get("name") as string
    const bio = formData.get("bio") as string
    const twitter = formData?.get("twitter") as string
    const instagram = formData?.get("instagram") as string
    const onlyfans = formData?.get("onlyfans") as string

    await prisma.user.update({
        where: {id},
        data: {
            name,
            bio,
            twitter,
            instagram,
            onlyfans


        }
    })

    revalidatePath(`/profile/${id}`)


}

export async function createPost( formData: FormData): Promise<void> {
    const content = formData.get("content") as string;
    const authorId = formData.get("authorId") as string;

    await prisma.post.create({
        data: {
            content,
            authorId,
        }
    });
    revalidatePath(`/profile/${authorId}`);
}

export async function fetchPosts() {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return posts;
  }

  export async function searchUsers(formData: FormData) {
    const query = formData.get('query') as string;
  
    if (!query || query.trim() === "") return [];
  
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
        role: 'CREATOR',
      },
      select: {
        id: true,
        name: true,
      },
    });
  
    return users;
  }


  export async function displayProfile(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
  
    return user;
  }



  // Server Action to create a scene
export async function createScene(formData: FormData): Promise<void> {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const status = formData.get('status') as SceneStatus;
  const fundingGoal = Number(formData.get('fundingGoal'));
  const nicheTags = (formData.get('nicheTags') as string)?.split(',') || [];
  const videoUrl = formData.get('videoUrl') as string;
  const creatorId = formData.get('creatorId') as string;

  await prisma.scene.create({
    data: {
      title, 
      description,
      status,
      fundingGoal,
      nicheTags: { set: nicheTags },
      videoUrl,
      creatorId
    }
  })
} 


  export async function fetchScenes() {
    const scenes = await prisma.scene.findMany({
      include: {
        creator: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    console.log(scenes)
    return scenes;
  }

  export async function fetchCreatorScenes(creatorId: string) {
    const scenes = await prisma.scene.findMany({
      where: {
        creatorId,
      },
      include: {
        creator: {
          select: { name: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return scenes;
  }

  export  async function subscribeToCreator(creatorId: string, subscriberId: string){
    await prisma.subscription.create({
      data: {
        user: {connect: { id: subscriberId}},
        creator: {connect: { id: creatorId}},
        startDate: new Date()
      }
    })
  }


  export const fetchSubscriptions = async (userId: string) => {
    const subscriptions = await prisma.subscription.findMany({
      where: {
        userId
      },
      include: {
        creator: true
      }
    })
    return subscriptions
  }


  export async function isSubscriber(creatorId: string, userId: string) {
    const subscription = await prisma.subscription.findFirst({
      where: {
        creatorId,
        userId
      }
    })
    return !!subscription
  }

  export const unSubscribe = async (creatorId: string, userId: string) => {
    await prisma.subscription.deleteMany({
      where: {
        creatorId,
        userId
      }
    })
  }

  export async function viewScene(sceneId: string): Promise<Scene | null> {
    try {
      const scene = await prisma.scene.findFirst({
        where: { id: sceneId },
        include: {
          creator: {
            select: { id: true, name: true },
          },
        },
      });
      return scene; // ✅ Ensure it returns the scene or null
    } catch (error) {
      console.error("Error fetching scene:", error);
      return null; // ✅ Handle errors by returning null
    }
  }


  export async function fundScene(userId: string, sceneId: string, amount: number) {
    await prisma.pledge.create({
      data: {
        amount,
        sceneId,
        userId
      }
    })

    await prisma.scene.update({
      where: {id: sceneId},
      data: {
        currentFunding: {
          increment: amount
        }
      }
    })
  }


  export async function fetchPledges(userId: string) {
    try {
      const pledges = await prisma.pledge.findMany({
        where: { userId },
        include: {
          user: { select: { name: true } }, // ✅ Fetch user name
          scene: { select: { title: true } }, // ✅ Fetch scene title
        },
        orderBy: { createdAt: "desc" }, // ✅ Order by newest first
      });
  
      // ✅ Ensure `createdAt` is formatted as a string before sending to frontend
      return pledges.map((pledge) => ({
        ...pledge,
        createdAt: pledge.createdAt.toISOString(),
        status: pledge.status as PledgeStatus, // ✅ Ensure correct status typing
      }));
    } catch (error) {
      console.error("Error fetching pledges:", error);
      throw new Error("Failed to fetch pledges.");
    }
  }