// @ts-nocheck

import bcryptjs from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import db from "../../../utils/db";

type SessionUser = {
  _id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  isAdmin?: boolean;
};

type CustomSession = {
  user: SessionUser;
};

type CustomToken = {
  _id?: string;
  isAdmin?: any;
  iat?: number;
  exp?: number;
};

type Credentials = {
  email: string;
  password: string;
};

export default NextAuth({
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: CustomToken | any;
      user?: SessionUser | any;
    }) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: CustomSession | any;
      token: CustomToken | any;
    }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials: Credentials) {
        await db.connect();
        const user = await User.findOne({
          email: credentials.email,
        });
        await db.disconnect();
        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: "f",
            isAdmin: user.isAdmin,
          };
        }
        throw new Error("Invalid email or password");
      },
    }),
  ],
});
