import mongoose from "mongoose"

let { Schema } = mongoose

let GallerySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },

}
, {
    timestamps: true
}
)