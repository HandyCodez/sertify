import { dbConnect } from "./dbConnect";
import User from "./model/User";
import { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        credentials({
            name: "Credentials",
            id: "Credentials",
            credentials: {
                nim: { label: "NIM", type: "text" },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    const { nim, password } = credentials
                    await dbConnect()

                    const user = await User.findOne({ nim })

                    if (!user) throw new Error("No user found with this NIM")

                    const passwordMatch = await bcrypt.compare(password, user.password)

                    if (!passwordMatch) throw new Error("Wrong Password")
                    return user
                } catch (error) {
                    return console.log(error)
                }
            },
        })
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account?.provider === "credentials") {
                token.nim = user.nim;
                token.name = user.name;
                token.phone = user.phone;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.nim = token.nim;
            session.user.name = token.name;
            session.user.phone = token.phone;
            session.user.role = token.role;
            return session;
        },
    },
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
        updateAge: 60 * 60,
    },
    secret: process.env.AUTH_SECRET,
}