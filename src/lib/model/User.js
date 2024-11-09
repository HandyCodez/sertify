import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema({
    nim: {
        type: String,
        unique: true,
        required: [true, 'nim is required']
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: [true, 'name is required']
    },
    jurusan: {
        type: Schema.Types.ObjectId,
        ref: 'Jurusan',
        required: true
    },
    prodi: {
        type: Schema.Types.ObjectId,
        ref: 'Prodi',
        required: true
    },
    phone: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "superadmin", "user"],
        default: "user"
    }
}, { timestamps: true, versionKey: false })

const User = mongoose.models.User || model('User', UserSchema)
export default User