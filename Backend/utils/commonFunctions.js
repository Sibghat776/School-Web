import dotenv from "dotenv";
import mongoose from "mongoose"
dotenv.config();
import jwt from "jsonwebtoken";

export const createError = (status, message) => {
    const err = new Error()
    err.status = status
    err.message = message
    return err
}
export const createSuccess = (status, message, data = {}) => {
    const successObj = {}
    successObj.status = status
    successObj.message = message
    successObj.data = data
    return successObj
}


export const verifyToken = (req, res, next, callback) => {
    try {
        const authHeader = req.headers.authorization;
        let token;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        } else if (req.cookies && req.cookies.access_token) {
            token = req.cookies.access_token;
        }

        if (!token) {
            return next(createError(401, "You are not authenticated!"));
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.error("JWT Verification Error:", err);
                return next(createError(403, "Token is not valid!"));
            }
            req.user = user;
            if (typeof callback === "function") {
                return callback();
            }
            next();
        });
    } catch (error) {
        next(error);
    }
};

// Generic role guard: pass allowed roles array
export const verifyRole = (roles = []) => (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (roles.includes(req.user.role)) {
            return next();
        }
        return next(createError(401, "You are not authorized"));
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            next(createError(401, "You are not authorized"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            next(createError(401, "You are not authorized"));
        }
    });
};

