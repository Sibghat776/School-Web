import e from "express"
import { register } from "../Controllers/registrationController.js"

export const registrationRouter = e.Router()


registrationRouter.post("/register", register)