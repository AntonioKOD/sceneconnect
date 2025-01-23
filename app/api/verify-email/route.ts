import { NextResponse } from "next/server";

import {  PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request){
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if(!token){
        return NextResponse.json({error: "No token provided"}, {status: 400});
    }

    try{
        const user = await prisma.user.findFirst({
            where: {
                emailToken: token
            }
        })
        if(!user){
            return NextResponse.json({error: "Invalid token"}, {status: 400});
        }
        if(user.emailVerified){
            return NextResponse.json({error: "Email already verified"}, {status: 400});
        }

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                emailVerified: true,
                emailToken: null
            }
        })
            return NextResponse.redirect(new URL("/login", req.url));
    }catch(err){
        console.error(err);
        return NextResponse.json({error: "Failed to verify email"}, {status: 500});
    }

}