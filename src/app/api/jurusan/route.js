import { dbConnect } from "@/lib/dbConnect";
import Jurusan from "@/lib/model/Jurusan";
import { NextResponse } from "next/server";

// CREATE JURUSAN
export async function POST(req) {
    const { name } = await req.json()

    try {
        await dbConnect()
        const newJurusan = new Jurusan({
            name
        });

        await newJurusan.save()

        return NextResponse.json({ success: true, newJurusan });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, error: error });
    }
}

// GET JURUSAN
export async function GET(req) {
    try {

        await dbConnect();

        const jurusan = await Jurusan.find({});
        return NextResponse.json({ success: true, jurusan });
    } catch (error) {
        console.error('Token verification error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// DELETE USER
export async function DELETE(req) {

    const { _id } = await req.json()
    try {
        await dbConnect()
        const jurusan = await Jurusan.findOneAndDelete({ _id: _id })
        return NextResponse.json({ success: true, jurusan });
    } catch (error) {
        return NextResponse.json({ success: false, error: error });
    }
}