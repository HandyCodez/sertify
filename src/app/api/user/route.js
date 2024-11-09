import User from "../../../lib/model/User";
import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { getToken } from "next-auth/jwt";
import { headers } from 'next/headers'
import Prodi from "@/lib/model/Prodi";
import Jurusan from "@/lib/model/Jurusan";

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
        await Prodi.find({})
        await Jurusan.find({})
        const users = await User.find({}).populate('jurusan', 'name').populate('prodi', 'name');
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

// UPDATE USER
export async function PUT(req) {

    const { nim, password, name, phone, jurusan, prodi, role } = await req.json();
    try {
        await dbConnect();

        // Prepare update data
        const updateData = {
            nim,
            name,
            phone,
            jurusan,
            prodi,
            role
        };

        // If password is provided, hash it
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            updateData.password = hashedPassword;
        }

        // Find and update user
        const updatedUser = await User.findOneAndUpdate(
            { nim: nim },
            updateData,
            { new: true } // Return updated document
        ).select('-password'); // Exclude password from response

        if (!updatedUser) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            user: updatedUser
        });

    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }

}