import e from "express"
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import ContactMessages from "../Models/ContactMessages.js";
import { createSuccess } from "../utils/commonFunctions.js";

dotenv.config();

export const sendMessage = async (req, res) => {
    try {
        console.log(req.body, "Data")
        const { studentName, contactNo, studentClass, message } = req.body;

        const Message = new ContactMessages({
            studentName,
            contactNo,
            studentClass,
            message
        })

        await Message.save();
        let data = createSuccess(200, "Message delivered successfully!", {
            studentName: Message.name,
            contactNo: Message.email,
            studentClass: Message.studentClass,
            message: Message.message
        });
        res.status(200).json({ data });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to send message",
        });
    }
}

export const getMessages = async (req, res, next) => {
    try {
        const messages = (await ContactMessages.find()).sort({ createdAt: -1 });
        let data = createSuccess(200, "Messages Fetched Successfully", { messages });
        res.status(200).json({ data });
    } catch (error) {

    }
}