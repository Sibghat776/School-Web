import e from "express"
import { deleteAllStudents, deleteStudentById, getStudentById, getStudents, register } from "../Controllers/registrationController.js"

export const registrationRouter = e.Router()


registrationRouter.post("/register", register)
registrationRouter.get("/getStudents", getStudents)
registrationRouter.get("/getStudent/:id", getStudentById)
registrationRouter.delete("/deleteStudent/:id", deleteStudentById)
registrationRouter.delete("/deleteAllStudents", deleteAllStudents)