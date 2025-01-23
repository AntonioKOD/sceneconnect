import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/utils/resend";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    if(req.method === "POST"){
        const {email, password, username} = await req.json()
        
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if(existingUser){
            return NextResponse.json({error: "User already exists"})

        }

        const hashedPassword = await bcrypt.hash(password,10)
        const emailToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username,
                emailToken,
                emailVerified: false,
                role: "CREATOR"
            }
        });
        await sendVerificationEmail(email, emailToken)
        
        return NextResponse.json({user})

    }else {
        return NextResponse.error();
    }
}
