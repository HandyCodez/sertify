import User from "../../../lib/model/User";
import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { getToken } from "next-auth/jwt";
import { headers } from 'next/headers'

const adminValidate = async (req) => {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        // If token is not present or user is not 'superadmin' or 'admin'
        if (!token || (token.role !== 'superadmin' && token.role !== 'admin')) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        return null; // If token is valid, return null to proceed
    } catch (error) {
        console.error("Error in adminValidate:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }


}

// CREATE USER
export async function POST(req) {
    const { nim, password, name, phone, role } = await req.json()
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await dbConnect()
        const newUser = new User({
            nim,
            password: hashedPassword,
            name,
            phone,
            role,
        });

        await newUser.save()

        return NextResponse.json({ success: true, newUser });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, error: error });
    }
}

// GET USER
export async function GET(req) {
    try {

        await dbConnect();

        const users = await User.find({});
        return NextResponse.json({ success: true, users });
    } catch (error) {
        console.error('Token verification error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}


// DELETE USER
export async function DELETE(req) {

    const { nim } = await req.json()
    try {
        await dbConnect()
        const user = await User.findOneAndDelete({ nim: nim })
        return NextResponse.json({ success: true, user });
    } catch (error) {
        return NextResponse.json({ success: false, error: error });
    }
}