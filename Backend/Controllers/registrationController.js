import Registration from "../Models/Registration.js";
import { createError, createSuccess } from "../utils/commonFunctions.js";

// ================= REGISTER STUDENT =================
export const register = async (req, res, next) => {
    try {
        const {
            StudentName,
            ClassAdmitted,
            DateOfBirth,
            stdBFormNo,
            gender,
            Cast,
            lastSchoolAttended,
            FatherName,
            FatherCNIC,
            FatherContactNo,
            FatherOccupation,
            FatherIncome,
            MotherName,
            Address
        } = req.body || {};

        // ---------- REQUIRED FIELD VALIDATION ----------
        const requiredFields = {
            StudentName,
            ClassAdmitted,
            DateOfBirth,
            gender,
            FatherName,
            FatherCNIC,
            FatherContactNo,
            MotherName,
            Address
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
            FatherCNIC,
            FatherContactNo,
            FatherIncome,
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
            StudentName: StudentName.trim(),
            ClassAdmitted,
            DateOfBirth,
            stdBFormNo,
            gender,
            Cast,
            lastSchoolAttended,
            FatherName: FatherName.trim(),
            FatherCNIC,
            FatherContactNo,
            FatherOccupation,
            FatherIncome,
            MotherName: MotherName.trim(),
            Address: Address.trim()
        });

        res.status(201).json(
            createSuccess(201, "Student registered successfully", student)
        );

    } catch (error) {
        next(error);
    }
};

// ================= GET ALL REGISTRATIONS =================
export const getAllRegistrations = async (req, res, next) => {
    try {
        const registrations = await Registration.find().sort({ createdAt: -1 });

        res.status(200).json(
            createSuccess(200, "Registrations fetched successfully", registrations)
        );
    } catch (error) {
        next(error);
    }
};

// ================= GET REGISTRATION BY ID =================
export const getRegistrationById = async (req, res, next) => {
    try {
        const student = await Registration.findById(req.params.id);

        if (!student) {
            return next(createError(404, "Registration not found"));
        }
        const data = createSuccess(200, "Registration fetched successfully", student)
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};