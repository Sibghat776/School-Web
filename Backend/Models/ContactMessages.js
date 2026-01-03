import mongoose from "mongoose"

let { Schema } = mongoose

let MessagesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        require: true
    }
}
    , {
        timestamps: true
    }
)

export default mongoose.model("Messages", MessagesSchema)