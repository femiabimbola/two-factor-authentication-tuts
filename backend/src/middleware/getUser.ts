import { Request, Response, NextFunction } from "express";
import { User } from "../database/schema";
import jwt from 'jsonwebtoken';

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Please sign in" }); 
    }
    try {
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        const user = await User.findOne({ id: decodedToken.id }).select('-password');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = user; // Attach user to req object
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};