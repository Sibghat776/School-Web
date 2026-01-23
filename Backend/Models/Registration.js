import mongoose from "mongoose"

let { Schema } = mongoose

let RegistrationSchema = new mongoose.Schema({
    StudentName: {
        type: String,
        required: true
    },
    DateOfBirth: {
        type: Date,
        required: true
    },
    stdBFormNo: {
        type: Number,
        Optional: true,
        unique: true
    },
    gender: {
        type: String,
        required: true
    },
    Cast: {
        type: String,
        Optional: true
    },
    lastSchoolAttended: {
        type: String,
        Optional: true
    },
    FatherName: {
        type: String,
        required: true
    },
    FatherCNIC: {
        type: String,
        required: true
    },
    FatherContactNo: {
        type: String,
        required: true
    },
    FatherOccupation: {
        type: String,
        Optional: true
    },
    FatherIncome: {
        type: Number,
        Optional: true
    },
    Email:{
        type: String,
        Optional: true
    },
    MotherName: {
        type: String,
        required: true
    },
    ClassAdmitted: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    }
})

export default mongoose.model("Registration", RegistrationSchema)