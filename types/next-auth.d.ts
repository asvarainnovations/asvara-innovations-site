// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `getSession()` and `useSession()`
   */
  interface Session {
    user: {
      /** Ensure this matches whatever you put into `token.id` */
      id: string;
      /** (Optional) if you added `role` in your callbacks */
      role?: string;
    } & DefaultSession["user"];
  }

  /**
   * Returned by `jwt` callback, and available as `token` in other callbacks
   */
  interface JWT {
    /** Populated in your `jwt({ token, user })` callback */
    id?: string;
    /** (Optional) if you added it in `jwt` */
    role?: string;
  }

  /**
   * (If you ever use `User` from next-auth directly)
   */
  interface User extends DefaultUser {
    id: string;
    role?: string;
  }
}
