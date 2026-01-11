import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();

// File type filter: Only images allowed
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Only images are allowed"), false);
    }
};  

const upload = multer({
    storage,
    limits: { fileSize: 6 * 1024 * 1024 }, // Max: 5MB per file
    fileFilter
});

export default upload;