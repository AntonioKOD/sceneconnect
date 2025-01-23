import { getServerSession, NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { RequestInternal, SessionStrategy } from "next-auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = ({
  adapter: PrismaAdapter(prisma),
  providers: [
    {
      id: "credentials",
      name: "Credentials",
      type: "credentials" as const,
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async authorize(credentials: Record<string, string> | undefined, req: Pick<RequestInternal, "query" | "body" | "headers" | "method">): Promise<{ id: string; email: string; name: string } | null> {
        // Ensure credentials are defined
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email and password are required");
        }


        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          throw new Error("No user found with the provided email");
        }

        // Check if the user's email is verified
        if (!user.emailVerified) {
          throw new Error("Please verify your email before logging in.");
        }

        // Check if the user's password is valid
        if (!user.password) {
          throw new Error("User password is not set");
        }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        // Return only the necessary user fields
        return {
          id: user.id,
          email: user.email ?? '',
          name: user.username ?? '',
        };
      },
    },
  ],
  session: {
    strategy: "jwt" as SessionStrategy,
  },
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
          name: user.name ?? user.username,
        };
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure you have a secret set in your .env
});

export const getAuthSession = () => getServerSession(authOptions);

