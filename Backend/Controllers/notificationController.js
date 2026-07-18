import Notification from "../Models/Notification.js";
import { createSuccess, createError } from "../utils/commonFunctions.js";

// Admin: create notification
export const createNotification = async (req, res, next) => {
  try {
    const { title, message, audience, className } = req.body;
    if (!title || !message) {
      return next(createError(400, "title and message are required"));
    }
    const notification = await Notification.create({
      title: title.trim(),
      message: message.trim(),
      audience: audience || "All",
      className,
      createdBy: req.user.id,
    });
    const data = createSuccess(201, "Notification created", { notification });
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

// List notifications visible to the requesting role
export const getNotifications = async (req, res, next) => {
  try {
    const role = req.user.role;
    const filter = {
      $or: [{ audience: "All" }, { audience: role }],
    };
    if (req.user.role === "student" && req.user.className) {
      filter.$or.push({ className: req.user.className });
    }
    const notifications = await Notification.find(filter).sort({ createdAt: -1 });
    const data = createSuccess(200, "Notifications fetched", { notifications });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Admin: delete notification
export const deleteNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) return next(createError(404, "Notification not found"));
    const data = createSuccess(200, "Notification deleted", { notification });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

