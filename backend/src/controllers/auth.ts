import { Request, Response, NextFunction, Router } from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import speakeasy from "speakeasy"
import { User } from "../database/schema";

export const register = async(req: Request, res: Response):Promise<any> => {
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
    return res.status(200).send({ message: "User successfully registered", data: savedUser })

  } catch (error) {
    res.status(500).json({error: "error registering user", message:error})
  }
}

 
export const login = async(req: Request, res: Response):Promise<any> => {
  try {
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).send({ message: "Enter all the details" });
  
    const user = await User.findOne({ email })
    if(!user) return  res.status(400).send({ message: "User does not exist" });
  
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(400).send({ message: "Password does not match" });
  
     const tokenData = {
     id: user.id,
     email: user.email,
    firstname: user.firstName,
     lastname: user.lastName
     }
  
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1h' })
   
    res.cookie('token', token, { httpOnly: true });
  
    return res.status(200).send({ message: "User successfully sign in" })
  } catch (error) {
    res.status(500).json({error: "log in the user", message:error})
  }
}

export const authStatus = async(req: Request, res: Response) :Promise<any> => {
  const token = req.cookies.token
  if(!token) return res.status(200).send({ message: "Please sign in" })
  const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!)
  const user = await User.findOne({ id: decodedToken.id }).select('-password ')
  return res.status(200).send({ message:  user })
}



export const logout = async(req: Request, res: Response) => {}

export const setup2FA = async(req: Request, res: Response) => {
  try {
    const user = req.user; // Access the user from req
        if (!user) {
            return res.status(400).json({ message: "User not available" });
        }

        const secret = speakeasy.generateSecret();
  } catch (error) {
    res.status(500).json({error: "Cannot setup 2FA", message:error})
  }
}

export const verify2FA = async(req: Request, res: Response) => {}

export const reset2FA = async(req: Request, res: Response) => {}