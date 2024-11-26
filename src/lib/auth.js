import { dbConnect } from "./dbConnect";
import User from "./model/User";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60, // 24 hours
        updateAge: 60 * 60, // 1 hour
    },
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                nim: { label: "NIM", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.nim || !credentials?.password) {
                    throw new Error("Missing credentials");
                }

                await dbConnect();

                const user = await User.findOne({ nim: credentials.nim }).populate('jurusan', 'name').populate('prodi', 'name');
                console.log(user)

                if (!user) {
                    throw new Error("No user found with this NIM");
                }

                const passwordMatch = await bcrypt.compare(credentials.password, user.password);

                if (!passwordMatch) {
                    throw new Error("Wrong Password");
                }

                return {
                    id: user._id.toString(),
                    nim: user.nim,
                    name: user.name,
                    phone: user.phone,
                    role: user.role,
                    jurusan: user.jurusan,
                    prodi: user.prodi,
                };
            },
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.nim = user.nim;
                token.name = user.name;
                token.phone = user.phone;
                token.role = user.role;
                token.jurusan = user.jurusan;
                token.prodi = user.prodi;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.nim = token.nim;
                session.user.name = token.name;
                session.user.phone = token.phone;
                session.user.role = token.role;
                session.user.jurusan = token.jurusan;
                session.user.prodi = token.prodi;
                session.accessToken = token.sub; // Use token's 'sub' field as accessToken
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
    }

};