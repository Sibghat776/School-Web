import Registration from "../Models/Registration.js";
import { createError, createSuccess } from "../utils/commonFunctions.js";

export const register = async (req, res, next) => {
    try {
        if (!req.body) return next(createError(401, "Please fill all fields"))
        const { StudentName, ClassAdmitted, DateOfBirth, stdBFormNo, gender, Cast, lastSchoolAttended, FatherName, FatherCNIC, FatherContactNo, FatherOccupation, FatherIncome, MotherName, Address } = req.body;

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
            .filter(([_, value]) => !value)
            .map(([key]) => key);

        if (missingFields.length > 0) {
            return next(
                createError(
                    400,
                    `Please fill required fields: ${missingFields.join(", ")}`
                )
            );
        }

        if (stdBFormNo) {
            const existingStudent = await Registration.findOne({ stdBFormNo: stdBFormNo });


            if (existingStudent) {
                return next(createError(400, "Student with this BForm No already exists"));
            }
        }

        let numberValues = {
            FatherCNIC,
            FatherContactNo,
            FatherIncome,
            stdBFormNo
        }
        let shouldBeInString = Object.entries(numberValues);

        for (let [key, value] of shouldBeInString) {
            if (value && isNaN(value)) {
                return next(createError(400, `${key} must be a number`));
            }
        }

        const newStudent = {
            StudentName,
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
            Address,
            ClassAdmitted
        }
        const Student = new Registration(newStudent);
        await Student.save();
        const data = createSuccess(200, "Student Registered Successfully", Student)
        res.status(200).json(data);
    }
    catch (err) {
        next(err);
    }
}