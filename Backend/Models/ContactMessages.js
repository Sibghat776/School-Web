import mongoose from "mongoose"

let { Schema } = mongoose

let MessagesSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    studentClass: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}
    , {
        timestamps: true
    }
)

export default mongoose.model("Messages", MessagesSchema)