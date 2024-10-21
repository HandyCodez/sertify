import mongoose, { Schema, model } from "mongoose";

const CertificateSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    namaSertifikat: {
        type: String,
        required: true
    },
    jenisSertifikat: {
        type: String,
        required: true
    },
    lembagaPenerbit: {
        type: String,
        required: true
    },
    tanggalPenerbitan: {
        type: Date,
        required: true
    },
    nomorSertifikat: String,
    tingkatSertifikat: {
        type: String,
        enum: ['lokal', 'nasional', 'internasional'],
        required: true
    },
    deskripsi: String,
    fileSertifikat: String,
    kategoriSertifikat: {
        type: String,
        enum: ['akademik', 'non-akademik', 'bahasa', 'teknologi'],
        required: true
    },
    statusVerifikasi: {
        type: Boolean,
        default: false
    }

}, { timestamps: true, versionKey: false })

const Certificate = mongoose.models.Certificate || model('Certificate', CertificateSchema)
export default Certificate