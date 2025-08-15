// utils/rateLimiter.js
import rateLimit from "express-rate-limit";

/**
 * Creates a reusable rate limiter middleware
 * @param {number} windowMs  - Time window in milliseconds (default: 1 minute)
 * @param {number} max       - Max requests allowed in the time window
 * @param {string} message   - Error message when limit is exceeded
 * @returns {Function} Express middleware
 */
export function createRateLimiter(windowMs = 60 * 1000, max = 5, message = "Too many requests, try again later.") {
    return rateLimit({
        windowMs,
        max,
        standardHeaders: true, // returns rate limit info in headers
        legacyHeaders: false,  // disables the old X-RateLimit headers
        message: { success: false, message }
    });
}
