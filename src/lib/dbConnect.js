// lib/dbConnect.js
import mongoose from "mongoose";
const { MONGODB_URI } = process.env

if (!MONGODB_URI) {
    throw new Error('Please define MONGODB_URI environment variable')
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise
        return cached.conn
    } catch (e) {
        cached.promise = null
        throw e
    }
}