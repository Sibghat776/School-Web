import express from "express";
import { addPost, deletePostById, getPosts } from "../Controllers/galleryController.js";
import upload from "../middlewares/upload.js";
export const galleryRouter = express.Router();
// Create a new gallery item

galleryRouter.post("/addPost", upload.array("imageUrl", 5), addPost)
galleryRouter.get("/getPosts", getPosts)
galleryRouter.delete("/deletePost/:id", deletePostById)