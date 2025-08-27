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


export const verifyToken = (req, res, next) => {
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
        // Verify the token

        jwt.verify(token, process.env.JWT, (err, user) => {
            if (err) {
                console.error("JWT Verification Error:", err); // Debugging
                return next(createError(403, "Token is not valid!")); // 403 for invalid/expired token
            }
            req.user = user; // Attach decoded user payload to req.user
            next();
        });
    } catch (error) {
        next(error)
    }
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        }
        else {
            next(createError(401, "You are note authorized"))
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.isAdmin) {
            next()
        }
        else {
            next(createError(401, "You are not authorized"))
        }
    })
}



export const connectDB = async () => {
    const cached = global.mongoose || {};
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const MONGO = process.env.MONGO;
        if (!MONGO) throw createError(500, "MongoDB URI not found in env");

        cached.promise = mongoose
            .connect(MONGO, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then((mongooseInstance) => {
                console.log("✅ New DB Connected");
                return mongooseInstance;
            });
    }
    cached.conn = await cached.promise;
    return cached.conn;
};
