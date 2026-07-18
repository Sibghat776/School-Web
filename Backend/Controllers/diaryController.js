import Diary from "../Models/Diary.js";
import { createSuccess, createError } from "../utils/commonFunctions.js";

// Teacher/Admin: create diary entry
export const createDiary = async (req, res, next) => {
  try {
    const {
      title, description, className, section, subject, homeworkDate, dueDate,
    } = req.body;
    if (!title || !description || !className) {
      return next(createError(400, "title, description and className are required"));
    }
    const diary = await Diary.create({
      title: title.trim(),
      description: description.trim(),
      className,
      section,
      subject,
      homeworkDate,
      dueDate,
      createdBy: req.user.id,
    });
    const data = createSuccess(201, "Diary entry created", { diary });
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

// List diary entries (filters: className)
export const getDiary = async (req, res, next) => {
  try {
    const { className, section } = req.query;
    const filter = {};
    if (className) filter.className = className;
    if (section) filter.section = section;
    const entries = await Diary.find(filter).populate("createdBy", "name").sort({ createdAt: -1 });
    const data = createSuccess(200, "Diary fetched", { entries });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Update diary entry
export const updateDiary = async (req, res, next) => {
  try {
    const diary = await Diary.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!diary) return next(createError(404, "Diary entry not found"));
    const data = createSuccess(200, "Diary updated", { diary });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

// Delete diary entry
export const deleteDiary = async (req, res, next) => {
  try {
    const diary = await Diary.findByIdAndDelete(req.params.id);
    if (!diary) return next(createError(404, "Diary entry not found"));
    const data = createSuccess(200, "Diary deleted", { diary });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

