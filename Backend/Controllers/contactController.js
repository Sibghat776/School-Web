import e from "express"
import nodemailer from "nodemailer";
import dotenv from "dotenv";


export const sendMessage = async (req, res) => {
    dotenv.config();
    const { name, email, message } = req.body;
    console.log(req.body, "Data")

    try {
        // OPTIONAL: Save in database
        // const newContact = new Contact({ name, email, subject: "Contact", message });
        // await newContact.save();

        // Send Email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: process.env.EMAIL,             // <-- apni email
            subject: "New Contact Form Message",
            text: `Name: ${name}\nEmail: ${email}\nMessage:${message}
      `,
        });
        res.status(200).json({
            success: true,
            message: "Message delivered successfully!",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to send message",
        });
    }
}