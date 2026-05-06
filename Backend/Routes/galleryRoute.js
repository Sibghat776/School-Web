import express from "express";
import { addPost, deletePostById, getPosts } from "../Controllers/galleryController.js";
import upload from "../middlewares/upload.js";
export const galleryRouter = express.Router();


galleryRouter.post("/addPost", upload.array("images", 15), addPost)
galleryRouter.get("/getPosts", getPosts)
galleryRouter.delete("/deletePost/:id", deletePostById)
