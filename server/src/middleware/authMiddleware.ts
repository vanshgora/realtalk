import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "thisissecret";

const authenticate = async (req: Request & { user: Object }, res: Response, next: NextFunction) => {

    try {

        const token = req.header('x-auth-token');

        if (!token) {
            return res.status(401).json('No token, authorization denied');
        }

        // Verify token
        const verified = jwt.verify(token, JWT_SECRET as string);

        if (!verified) {
            return res.status(401).json('Token verification failed, authorization denied');
        }

        req.user = verified;
        next();

    } catch (error) {
        console.error('Error handling request:', error);
        return res.status(500).json('Internal Server Error');
    }
}
