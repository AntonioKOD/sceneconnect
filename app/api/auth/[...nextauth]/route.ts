/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { RequestInternal, SessionStrategy } from "next-auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = { // ✅ Export authOptions
  adapter: PrismaAdapter(prisma),
  providers: [
    {
      id: "credentials",
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<string, string> | undefined, req: Pick<RequestInternal, "query" | "body" | "headers" | "method">) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) throw new Error("No user found with the provided email");
        if (!user.emailVerified) throw new Error("Please verify your email before logging in.");
        if (!user.password) throw new Error("User password is not set");

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) throw new Error("Invalid credentials");

        return { id: user.id, email: user.email ?? '', name: user.name ?? '' };
      },
    },
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token } : {session: any, token: any}) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = { id: user.id, email: user.email, name: user.name };
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };