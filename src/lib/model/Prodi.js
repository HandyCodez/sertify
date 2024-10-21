import mongoose, { Schema, model } from "mongoose";

const ProdiSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    jurusan: {
        type: Schema.Types.ObjectId,
        ref: 'Jurusan',
        required: true
    },
    jenjang: {
        type: String,
        enum: ['D3', 'D4', 'S1'],
        required: true
    }

}, { timestamps: true, versionKey: false })

const Prodi = mongoose.models.Prodi || model('Prodi', ProdiSchema)
export default Prodi