import { Request, Response, NextFunction } from "express";
import { User } from "../database/schema";
import jwt from 'jsonwebtoken';

export const getUser = async (req: Request, res: Response, next: NextFunction) :Promise<any> => {
    const token = req.cookies.token;
   
    if (!token) {
        return res.status(400).json({ message: "Please sign in no token" }); 
    }
    try {
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!)
        const user = await User.findOne({ email: decodedToken.email}).select('-password')
        if (!user) {
            return res.status(404).json({ message: "Please sign in 2" });
        }
        req.user = user; // Attach user to req object
        next();
    } catch (error) {
        res.clearCookie("token");
        return res.status(401).json({ message: "Invalid token or expired token" });
    }
};