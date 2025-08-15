import mongoose from "mongoose"

let { Schema } = mongoose

let UserSchema = new mongoose.Schema({
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


export default mongoose.model("User", UserSchema)