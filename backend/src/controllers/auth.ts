import { Request, Response, NextFunction, Router } from "express";
import bcrypt from "bcrypt";
import { User } from "../database/schema";

export const register = async(req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body

    if(!firstName ||  !lastName || !email || !password) {
      return  res.status(400).send({ message: "Enter all the details" });
    }

    const user = await User.findOne({ email })
    if(user) return  res.status(400).send({ message: "User exists" });

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({firstName, lastName, email, password: hashedPassword,  })

    const savedUser = await newUser.save()
    return res.status(200).send({ message: "Enter all the details", data: savedUser });

  } catch (error) {
    res.status(500).json({error: "error registering user", message:error})
  }
}

export const login = async(req: Request, res: Response) => {}

export const authStatus = async(req: Request, res: Response) => {}

export const logout = async(req: Request, res: Response) => {}

export const setup2FA = async(req: Request, res: Response) => {}

export const verify2FA = async(req: Request, res: Response) => {}

export const reset2FA = async(req: Request, res: Response) => {}