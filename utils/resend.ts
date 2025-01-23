import {Resend } from 'resend'
import {render} from '@react-email/render'
import VerificationEmail from '@/components/VerificationEmail'
import React from 'react'


const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(to: string, token: string){
if(!process.env.NEXTAUTH_URL){
throw new Error("NEXTAUTH_URL is not set")
}

const verificationUrl = `${process.env.NEXTAUTH_URL}/api/verify-email?token=${token}`
const subject = "Verify your email address"

const html = await render(
    React.createElement(VerificationEmail, {
        verificationUrl,
        appName: "SceneCraft"
    })
)
try{
    await resend.emails.send({
        from: 'SceneCraft <info@wanderingbartender.com>',
        to,
        subject,
        html
    })
}catch(error){
    console.error("Failed to send email", error)
    throw new Error("Failed to send email")

}
}