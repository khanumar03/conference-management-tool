import NextAuth from "next-auth";
import { db } from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update,
} = NextAuth({
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async signIn({ user, account }) {
      const existingUser = await getUserById(user.id);
      if (!existingUser) return false;
      return true;
    },
    async session({ session, token, user }) {
      if (token.sub && session.user) session.user.id = token.sub;

      if (session.user) session.user.email = token.email;

      return session;
    },
    async jwt({ token, session }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return null;
      token.email = existingUser.email;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
