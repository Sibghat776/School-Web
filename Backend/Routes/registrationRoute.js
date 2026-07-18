import e from "express"
import { deleteAllStudents, deleteStudentById, getStudentById, getStudents, register, updateStatus } from "../Controllers/registrationController.js"

export const registrationRouter = e.Router()


registrationRouter.post("/register", register)
registrationRouter.get("/getStudents", getStudents)
registrationRouter.get("/getStudent/:id", getStudentById)
registrationRouter.patch("/updateStatus/:id", updateStatus)
registrationRouter.delete("/deleteStudent/:id", deleteStudentById)
registrationRouter.delete("/deleteAllStudents", deleteAllStudents)