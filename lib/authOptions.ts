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
        console.log('Google profile data:', { 
          sub: profile.sub,
          email: profile.email,
          name: profile.name,
          picture: profile.picture 
        });
        
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
    async signIn({ user, account, profile }: any) {
      try {
        console.log('=== Start SignIn Callback ===');
        console.log('SignIn user data:', JSON.stringify(user, null, 2));
        console.log('SignIn account data:', JSON.stringify(account, null, 2));
        console.log('SignIn profile data:', JSON.stringify(profile, null, 2));
        
        if (account?.provider === "google") {
          console.log('Provider is Google, checking for existing user...');
          const existingUser = await prismadb.user.findUnique({
            where: { email: user.email! }
          });
          
          console.log('Existing user found:', existingUser ? 'Yes' : 'No');

          if (!existingUser) {
            console.log('Creating new user with data:', {
              email: user.email,
              name: user.name,
              image: user.image
            });

            try {
              const newUser = await prismadb.user.create({
                data: {
                  email: user.email!,
                  fullName: user.name || "",
                  name: user.name || "",
                  image: user.image || "",
                  passwordHash: "",
                  role: "USER",
                  isActive: true,
                  emailVerified: new Date(),
                }
              });
              
              console.log('Successfully created new user:', {
                id: newUser.id,
                email: newUser.email,
                role: newUser.role
              });

              // Get the default service and basic plan
              const service = await prismadb.service.findFirst({
                where: { key: 'default' },
                include: {
                  plans: {
                    where: { name: 'Basic' }
                  }
                }
              });

              if (service && service.plans.length > 0) {
                // Create a default subscription for the new user
                const subscription = await prismadb.subscription.create({
                  data: {
                    userId: newUser.id,
                    serviceId: service.id,
                    planId: service.plans[0].id,
                    status: 'ACTIVE',
                    startDate: new Date(),
                    renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
                  }
                });
                
                console.log('Created default subscription:', {
                  id: subscription.id,
                  userId: subscription.userId,
                  planId: subscription.planId
                });
              }

              user.id = newUser.id;
              user.role = newUser.role;
            } catch (createError) {
              console.error('Error creating new user:', createError);
              throw createError;
            }
          } else {
            console.log('Using existing user:', {
              id: existingUser.id,
              email: existingUser.email,
              role: existingUser.role
            });

            user.id = existingUser.id;
            user.role = existingUser.role;
            
            // Update user's info if needed
            if (user.name !== existingUser.name || user.image !== existingUser.image) {
              console.log('Updating user profile info...');
              await prismadb.user.update({
                where: { id: existingUser.id },
                data: {
                  name: user.name || existingUser.name,
                  image: user.image || existingUser.image,
                }
              });
              console.log('Profile info updated successfully');
            }
          }
        }
        
        console.log('=== End SignIn Callback ===');
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        // Log the full error details
        if (error instanceof Error) {
          console.error('Error name:', error.name);
          console.error('Error message:', error.message);
          console.error('Error stack:', error.stack);
        }
        return false;
      }
    },
    async jwt({ token, user, account }: any) {
      console.log('JWT Callback - Input:', {
        tokenId: token?.id,
        userId: user?.id,
        accountType: account?.provider
      });
      
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.image = user.image;
      }
      
      console.log('JWT Callback - Output token:', {
        id: token.id,
        role: token.role,
        email: token.email,
        image: token.image
      });
      
      return token;
    },
    async session({ session, token }: any) {
      console.log('Session Callback - Input:', {
        sessionUserId: session?.user?.id,
        tokenId: token?.id
      });
      
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.image;
      }
      
      console.log('Session Callback - Output:', {
        userId: session?.user?.id,
        userRole: session?.user?.role,
        userImage: session?.user?.image
      });
      
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/";
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: false, // Disable debug mode for production
};