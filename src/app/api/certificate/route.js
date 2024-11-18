import { dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Certificate from "../../../lib/model/Certificate"; // Buat model ini
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

// CREATE Certificate
export async function POST(req) {
    try {
        await dbConnect();

        const formData = await req.formData();

        // Handle file upload
        const file = formData.get('fileSertifikat');
        let fileUrl = '';

        if (file) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            // Generate unique filename
            const filename = `${Date.now()}-${file.name}`;
            const filepath = path.join(process.cwd(), 'public', 'uploads', filename);

            // Save file
            await writeFile(filepath, buffer);
            fileUrl = `/uploads/${filename}`;
        }

        // Create new certificate
        const newCertificate = new Certificate({
            user: formData.get('id'),
            namaSertifikat: formData.get('namaSertifikat'),
            jenisSertifikat: formData.get('jenisSertifikat'),
            lembagaPenerbit: formData.get('lembagaPenerbit'),
            tanggalPenerbitan: formData.get('tanggalPenerbitan'),
            nomorSertifikat: formData.get('nomorSertifikat'),
            tingkatSertifikat: formData.get('tingkatSertifikat'),
            deskripsi: formData.get('deskripsi'),
            fileSertifikat: fileUrl,
            kategoriSertifikat: formData.get('kategoriSertifikat'),
            // status: false,
        });

        await newCertificate.save();
        return NextResponse.json({ success: true, certificate: newCertificate });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// GET All Certificates
export async function GET(req) {
    try {
        const url = new URL(req.url);
        const get = url.searchParams.get('get');
        await dbConnect();
        if (get === "all") {
            const certificates = await Certificate.find().populate('user');
            return NextResponse.json({ success: true, certificates });
        } else {
            const certificates = await Certificate.find({ nim: get }).populate('user');
            return NextResponse.json({ success: true, certificates });
        }
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// UPDATE Certificate
export async function PUT(req) {
    try {
        await dbConnect();

        const formData = await req.formData();
        const idSertifikat = formData.get('idSertifikat');

        // Ambil sertifikat yang ada
        const certificate = await Certificate.findOne({ _id: idSertifikat });
        if (!certificate) {
            return NextResponse.json({ success: false, error: "Certificate not found" }, { status: 404 });
        }

        // Handle new file upload if exists
        const file = formData.get('fileSertifikat');
        let fileUrl = formData.get('existingFileUrl'); // Keep existing file if no new file

        if (file && file instanceof Blob) {
            // Hapus file lama jika ada
            const oldFilePath = path.join(process.cwd(), 'public', certificate.fileSertifikat);
            await unlink(oldFilePath).catch(err => {
                console.error(`Failed to delete old file: ${err.message}`);
            });

            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const filename = `${Date.now()}-${file.name}`;
            const filepath = path.join(process.cwd(), 'public', 'uploads', filename);

            await writeFile(filepath, buffer);
            fileUrl = `/uploads/${filename}`; // Update fileUrl to point to the new file
        } else {
            fileUrl = certificate.fileSertifikat; // Use existing file if no new file is uploaded
        }

        const updateData = {
            namaSertifikat: formData.get('namaSertifikat'),
            jenisSertifikat: formData.get('jenisSertifikat'),
            lembagaPenerbit: formData.get('lembagaPenerbit'),
            tanggalPenerbitan: formData.get('tanggalPenerbitan'),
            nomorSertifikat: formData.get('nomorSertifikat'),
            tingkatSertifikat: formData.get('tingkatSertifikat'),
            deskripsi: formData.get('deskripsi'),
            fileSertifikat: fileUrl, // Save the new file URL
            kategoriSertifikat: formData.get('kategoriSertifikat'),
            status: formData.get('status'),
        };

        const updatedCertificate = await Certificate.findByIdAndUpdate(
            idSertifikat,
            updateData,
            { new: true } // Return the updated document
        );

        return NextResponse.json({ success: true, certificate: updatedCertificate });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }


}

// DELETE Certificate
export async function DELETE(req) {
    try {
        await dbConnect();
        const { id } = await req.json();

        // Optional: Delete file from storage
        const certificate = await Certificate.findById(id);
        if (certificate?.fileSertifikat) {
            const filepath = path.join(process.cwd(), 'public', certificate.fileSertifikat);
            try {
                await unlink(filepath);
            } catch (error) {
                console.error('Error deleting file:', error);
            }
        }

        await Certificate.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}