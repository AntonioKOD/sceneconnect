import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string; // User's unique ID from database
    } & DefaultSession["user"]; // Includes `name`, `email`, `image`
  }

  interface User extends DefaultUser {
    id: string; // User's unique ID from database
  }

  interface Profile {
    id: string; // OAuth provider's unique user ID
    login?: string; // Optional username for OAuth providers (e.g., GitHub)
  }
}