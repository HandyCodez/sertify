import mongoose, { Schema, model } from "mongoose";

const JurusanSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
}, { timestamps: true, versionKey: false })

const Jurusan = mongoose.models.Jurusan || model('Jurusan', JurusanSchema)
export default Jurusan