import mongoose from "mongoose"

let { Schema } = mongoose

let GallerySchema = new mongoose.Schema({
    teacherName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: [String],
        required: true
    }
}
    , {
        timestamps: true
    }
)

export default mongoose.model("Gallery", GallerySchema)