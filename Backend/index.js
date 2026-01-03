import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import { contactRoute } from "./Routes/contactRoute.js"
import { connectDB } from "./utils/commonFunctions.js"
import { galleryRouter } from "./Routes/gallery.js"

dotenv.config()

let app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.CLIENT_URL || true,
    credentials: true,
}));
app.use(helmet())


if (process.env.NODE_ENV !== "production") {
    (async () => {
        try {
            await connectDB();
            app.listen(process.env.PORT || 5000, () => {
                console.log(`🚀 Server running on ${process.env.PORT || 5000}`);
            });
        } catch (err) {
            console.error("DB connection failed:", err);
            process.exit(1);
        }
    })();
}
app.use("/api/contact", contactRoute)
app.use("/api/gallery", galleryRouter)


app.use((err, req, res, next) => {
    let errorStatus = err.status || 500
    let errorMessage = err.message || "Something went Wrong"

    res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})
