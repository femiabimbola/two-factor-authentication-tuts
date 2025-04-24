import { Request, Response, NextFunction } from "express";
import { User } from "../database/schema";
import jwt from 'jsonwebtoken';

export const getUser = async (req: Request, res: Response, next: NextFunction) :Promise<any> => {
    const token = req.cookies.token;
    console.log(`The token is ${token}`)
    if (!token) {
        return res.status(400).json({ message: "Please sign in" }); 
    }
    try {
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        console.log(decodedToken)
        const user = await User.findOne({ id: decodedToken.id }).select('-password');
        console.log(`The user is ${user}`)
        if (!user) {
            res.clearCookie("token");
            return res.status(404).json({ message: "Please sign in" });
        }
        req.user = user; // Attach user to req object
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token or expired token" });
    }
};