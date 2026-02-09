import mongoose from "mongoose"

const RegistrationSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    stdBFormNo: { type: String, unique: true, sparse: true },
    gender: { type: String, required: true },
    religion: { type: String, required: true },

    cast: { type: String, optional: true },
    lastSchoolAttended: { type: String, optional: true },

    fatherName: { type: String, required: true },
    fatherCNIC: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    fatherOccupation: { type: String },
    fatherIncome: { type: Number },

    email: { type: String, optional: true },
    motherName: { type: String, required: true },

    classAdmitted: { type: String, required: true },

    address: { type: String, required: true },
    city: { type: String, optional: true }
}, { timestamps: true })

export default mongoose.model("Registration", RegistrationSchema)
