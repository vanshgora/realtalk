"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || "thisissecret";
const authenticate = async (req, res, next) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json('No token, authorization denied');
        }
        // Verify token
        const verified = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (!verified) {
            return res.status(401).json('Token verification failed, authorization denied');
        }
        req.user = verified;
        next();
    }
    catch (error) {
        console.error('Error handling request:', error);
        return res.status(500).json('Internal Server Error');
    }
};
