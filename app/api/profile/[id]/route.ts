import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    if(!id){
        return new Response("Not found", {status: 404})
    }
    try{
    const user = await prisma.user.findUnique({
        where: { id }
    });

    if(!user){
        return new Response("Not found", {status: 404})
    }

    return new Response(JSON.stringify({user}), {status: 200})

}catch(e){
    console.error(e);
    return new Response("Internal server error", {status: 500})
}
}