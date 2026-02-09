import Registration from "../Models/Registration.js";
import { createError, createSuccess } from "../utils/commonFunctions.js";

// ================= REGISTER STUDENT =================
export const register = async (req, res, next) => {
    try {
        const {
            studentName,
            classAdmitted,
            dateOfBirth,
            stdBFormNo,
            gender,
            cast,
            lastSchoolAttended,
            fatherName,
            fatherCNIC,
            fatherContactNo,
            fatherOccupation,
            fatherIncome,
            motherName,
            address,
            religion
        } = req.body || {};

        // ---------- REQUIRED FIELD VALIDATION ----------
        const requiredFields = {
            studentName,
            classAdmitted,
            dateOfBirth,
            gender,
            fatherName,
            fatherCNIC,
            fatherContactNo,
            motherName,
            address,
            religion
        };

        const missingFields = Object.entries(requiredFields)
            .filter(([_, value]) => !value?.toString().trim())
            .map(([key]) => key);

        if (missingFields.length > 0) {
            return next(
                createError(
                    400,
                    `Required fields missing: ${missingFields.join(", ")}`
                )
            );
        }

        // ---------- GENDER VALIDATION ----------
        const allowedGenders = ["Male", "Female"];
        if (!allowedGenders.includes(gender)) {
            return next(createError(400, "Invalid gender value"));
        }

        // ---------- NUMERIC FIELD VALIDATION ----------
        const numericFields = {
            fatherCNIC,
            fatherContactNo,
            fatherIncome,
            stdBFormNo
        };

        for (const [key, value] of Object.entries(numericFields)) {
            if (value && !/^\d+$/.test(value)) {
                return next(createError(400, `${key} must contain only numbers`));
            }
        }

        // ---------- DUPLICATE B-FORM CHECK ----------
        if (stdBFormNo) {
            const exists = await Registration.exists({ stdBFormNo });
            if (exists) {
                return next(
                    createError(409, "Student with this B-Form number already exists")
                );
            }
        }

        // ---------- CREATE STUDENT ----------
        const student = await Registration.create({
            studentName: studentName.trim(),
            classAdmitted,
            dateOfBirth,
            stdBFormNo,
            gender,
            cast,
            lastSchoolAttended,
            fatherName: fatherName.trim(),
            fatherCNIC,
            fatherContactNo: fatherContactNo.trim(),
            fatherOccupation,
            fatherIncome,
            motherName: motherName.trim(),
            address: address.trim(),
            religion
        });

        res.status(201).json(
            createSuccess(201, "Student registered successfully", student)
        );

    } catch (error) {
        next(error);
    }
};

// ================= GET ALL REGISTRATIONS =================
export const getStudents = async (req, res, next) => {
    try {
        const registrations = await Registration.find().sort({ createdAt: -1 });

        res.status(200).json(
            createSuccess(200, "Students fetched successfully", registrations)
        );
    } catch (error) {
        next(error);
    }
};

// ================= GET REGISTRATION BY ID =================
export const getStudentById = async (req, res, next) => {
    try {
        const student = await Registration.findById(req.params.id);

        if (!student) {
            return next(createError(404, "Student not found"));
        }
        const data = createSuccess(200, "Student fetched successfully", student)
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

export const deleteAllStudents = async (req, res, next) => {
    try {
        await Registration.deleteMany({});
        const data = createSuccess(200, "All students deleted successfully", null)
        res.status(200).json(data);
    }
    catch (error) {
        next(error);
    }
};

export const deleteStudentById = async (req, res, next) => {
    try {
        const student = await Registration.findByIdAndDelete(req.params.id);
        if (!student) {
            return next(createError(404, "Student not found"));
        }
        const data = createSuccess(200, "Student deleted successfully", student);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};