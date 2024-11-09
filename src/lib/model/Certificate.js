import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
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
    nomorSertifikat: {
        type: String,
        required: true
    },
    tingkatSertifikat: {
        type: String,
        required: true
    },
    deskripsi: {
        type: String
    },
    fileSertifikat: {
        type: String,
        required: true
    },
    kategoriSertifikat: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['T', 'NT', 'G'], // T: Terverifikasi, NT: Tidak Terverifikasi, G: Gagal Verifikasi
        default: 'NT',
        required: true
    }

}, {
    timestamps: true
});

export default mongoose.models.Certificate || mongoose.model('Certificate', certificateSchema);