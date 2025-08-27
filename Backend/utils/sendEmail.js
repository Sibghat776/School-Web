import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: `"Sibghat Ullah" <${process.env.EMAIL}>`,
            to,
            subject,
            text
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
    } catch (err) {
        console.error("Error sending email: ", err.message);
    }
}