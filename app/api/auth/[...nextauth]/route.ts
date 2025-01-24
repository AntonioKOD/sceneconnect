import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // ✅ Import from shared auth.ts

const handler = NextAuth(authOptions);

// ✅ Correctly export API route handlers
export { handler as GET, handler as POST };