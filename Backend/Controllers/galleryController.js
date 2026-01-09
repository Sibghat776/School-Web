import e from "express";
import { createError } from "../utils/commonFunctions.js";

export let addPost = async (req, res, next) => {
    try {
        if (req.body || req.files == undefined) return next(createError(400, "Please provide all the required fields"));
        console.log(req.body, req.files, "data");
        
        res.status(200).json({ message: "Post added successfully" });
    } catch (error) {
        console.log(error)
        next(error);
    }
}