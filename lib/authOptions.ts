import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import prismadb from "@/lib/prismadb";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile"
        }
      },
      profile(profile: any) {
        return {
          id: profile.sub,
          email: profile.email,
          name: profile.name,
          image: profile.picture,
        };
      }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }
        const user = await prismadb.user.findUnique({
          where: { email: credentials.email }
        });
        if (!user || !user.isActive) {
          throw new Error("Invalid credentials");
        }
        const isValid = await compare(credentials.password, user.passwordHash);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }
        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
          role: user.role
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === "google") {
        const existingUser = await prismadb.user.findUnique({
          where: { email: user.email! }
        });
        if (!existingUser) {
          await prismadb.user.create({
            data: {
              email: user.email!,
              fullName: user.name || "",
              passwordHash: "",
              role: "USER",
              isActive: true
            }
          });
        }
      }
      return true;
    },
    async jwt({ token, user, account }: any) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};