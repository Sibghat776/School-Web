import Gallery from "../Models/Gallery.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { createError, createSuccess } from "../utils/commonFunctions.js";

export let addPost = async (req, res, next) => {
    try {
        if(!req.body) 
            return next(createError(401, "Please fill all fields"));

        const { teacherName, title } = req.body;

        if (!teacherName || !title)
            return next(createError(400, "Please fill all fields"));

        if (teacherName !== "Sibghat Ullah")
            return next(createError(403, "You are not authorized"));

        if (!req.files || req.files.length === 0)
            return next(createError(400, "Images are required"));

        // Upload images
        const uploadedImages = [];
        for (let file of req.files) {
            const result = await uploadToCloudinary(file.buffer, "uploads");
            uploadedImages.push(result.secure_url);
        }

        const newPost = new Gallery({
            teacherName,
            title,
            imageUrl: uploadedImages
        });

        await newPost.save();

        res.status(201).json(
            createSuccess(201, "Post Added Successfully", newPost)
        );

    } catch (error) {
        next(error);
    }
};
