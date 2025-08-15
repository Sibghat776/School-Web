import e from "express";
import { createRateLimiter } from "../utils/createRatelimiter.js";
import { sendMessage } from "../Controllers/contactControler.js";

export let contactRoute = e.Router()

contactRoute.post("/sendMessage", createRateLimiter(60 * 1000, 5, "You can Only Send 5 Messages per Minute"), sendMessage)