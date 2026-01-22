import mongoose from "mongoose"

let { Schema } = mongoose

let RegistrationSchema = new mongoose.Schema({
    StudentName: {
        type: String,
        required: true
    },
    FatherName: {
        type: String,
        required: true
    },
    MotherName: {
        type: String,
        required: true
    },
    DateOfBirth: {
        type: Date,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    ContactNumber: {
        type: String,
        required: true
    },
})

export default mongoose.model("Registration", RegistrationSchema)