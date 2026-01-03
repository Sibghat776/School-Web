import e from "express"
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import ContactMessages from "../Models/ContactMessages.js";
import { createSuccess } from "../utils/commonFunctions.js";


export const sendMessage = async (req, res) => {
    dotenv.config();
    const { name, email, message } = req.body;
    console.log("Preparing to send email...");
    try {
        console.log(req.body, "Data")

        const Message = new ContactMessages({
            name,
            email,
            message
        })

        await Message.save();
        let data = createSuccess(200, "Message delivered successfully!", {
            name: Message.name,
            email: Message.email,
            message: Message.message
        });
        res.status(200).json({
            data
        });
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
        const messages = await ContactMessages.find()
        let data = createSuccess(200, "Messages Fetched Successfully", { messages })
        res.status(200).json({ data });
    } catch (error) {

    }
}