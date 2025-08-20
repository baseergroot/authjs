import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import client from "./database/mongodbClient";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const {handlers, signIn, signOut, auth} = NextAuth({
  adapter: MongoDBAdapter(client),
  session: {
    strategy: "jwt"
  },
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {

        const db = await client.db("authjs").collection("users");
        
        let user: any = await db.findOne({
          email: credentials?.email,
        })
        const userMatch = await bcrypt.compare(credentials?.password as string, user?.password as string);
        console.log({user})
        if (!user || !userMatch) {
          throw new Error("email or password is incorrect");
        }
        return user 
      }
    })
  ]
})
