import { dbConnect } from "@/lib/dbConnect";
import Jurusan from "@/lib/model/Jurusan";
import Prodi from "@/lib/model/Prodi";
import { NextResponse } from "next/server";

// CREATE PRODI
export async function POST(req) {
    const { name, jurusan } = await req.json()

    try {
        await dbConnect()
        const newProdi = new Prodi({
            name,
            jurusan
        });

        await newProdi.save()

        return NextResponse.json({ success: true, newProdi });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, error: error });
    }
}

// GET PRODI
export async function GET(req) {
    try {

        await dbConnect();
        await Jurusan.find({})
        const prodi = await Prodi.find({}).populate('jurusan', 'name');

        return NextResponse.json({ success: true, prodi });
    } catch (error) {
        console.error('Token verification error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// DELETE PRODI
export async function DELETE(req) {

    const { _id } = await req.json()
    try {
        await dbConnect()
        const jurusan = await Prodi.findOneAndDelete({ _id: _id })
        return NextResponse.json({ success: true, jurusan });
    } catch (error) {
        return NextResponse.json({ success: false, error: error });
    }
}