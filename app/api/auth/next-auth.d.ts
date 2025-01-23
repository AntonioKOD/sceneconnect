import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  /**
   * Extended `Session` interface to include additional user properties like `id` and `username`.
   */
  interface Session extends DefaultSession {
    user: {
      id: string; // Unique user ID from your database
      username?: string | null; // Optional username
    } & DefaultSession['user']; // Includes `name`, `email`, and `image`
  }

  /**
   * Extended `User` interface to include custom properties like `username`.
   */
  interface User extends DefaultUser {
    id: string; // Unique user ID from your database
    username?: string | null; // Optional username for users
  }

  /**
   * (Optional) Extended `Profile` interface for OAuth-specific properties.
   */
  interface Profile {
    id: string; // OAuth provider's unique user ID
    login?: string; // OAuth provider's username (e.g., GitHub login)
  }
}