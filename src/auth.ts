import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import GoogleProvider from "next-auth/providers/google";

import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      // The authorize function validates the login credentials
      // eslint-disable-next-line
      async authorize(credentials: any): Promise<any> {
        try {
          // Find the user based on email
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
              isVerified:true
            },
          });

          // If the user doesn't exist
          if (!user) {
            throw new Error("No user found with this email");
          }

         
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password || ""
          );

          if(isPasswordCorrect) {
            return user;

          } 
          else{
            throw new Error("Incorrect password");
          }
        } 
        // eslint-disable-next-line
        catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],

  

  session: {
    strategy: "jwt", // JWT session instead of database
  },
  callbacks:{
    // JWT Callback: Store the user ID and other user info in JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    // Session Callback: Store the JWT token info in the session
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },

  },

  pages: {
    signIn: "/signin",
  },
});
