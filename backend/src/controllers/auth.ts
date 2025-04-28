import { Request, Response, NextFunction, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import { User } from "../database/schema";

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send({ message: "Enter all the details" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).send({ message: "User exists" });

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return res
      .status(200)
      .send({ message: "User successfully registered", data: savedUser });
  } catch (error) {
    res.status(500).json({ error: "error registering user", message: error });
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).send({ message: "Enter all the details" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ message: "User does not exist" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).send({ message: "Password does not match" });

    const tokenData = {
      id: user.id,
      email: user.email,
      firstname: user.firstName,
      lastname: user.lastName,
    };

    // const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1h' })

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!);

    res.cookie("token", token, { httpOnly: true, path: "/", maxAge: 500000 });

    return res.status(200).send({ message: "User successfully sign in" });
  } catch (error) {
    res.status(500).json({ error: "log in the user", message: error });
  }
};

export const authStatus = async (req: Request, res: Response): Promise<any> => {
  const user = req.user;
  if (!user) return res.status(404).json({ message: "User not found" });
  res.status(200).json({ message: "user found", data: user });
};

export const logout = async (req: Request, res: Response) => {};

export const setup2FA = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user = req.user; // Access the user from req
    if (!user) return res.status(400).json({ message: "Please sign in" });
    const secret = speakeasy.generateSecret();

    const dbUser = await User.findById(user._id)

    if(!dbUser) return res.status(400).json({ message: "User not found" });

    dbUser.userPreferences.twoFactorSecret = secret.base32;
    dbUser.userPreferences.enable2FA = true;

    // user.userPreferences.twoFactorSecret = secret.base32;
    // user.userPreferences.enable2FA = true;
   
    dbUser.markModified("userPreferences");

    try {
      await dbUser.save();
    } catch (saveError:any) {
      console.error("Error saving user to database:", saveError);
      return res.status(500).json({
        success: false,
        message: "Failed to save 2FA settings",
        error: saveError.message,
      });
    }

    console.log(dbUser)

    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${user.firstName}`,
      encoding: "base32",
      issuer: "Tush App",
    });

    const imageUrl = await qrCode.toDataURL(url);
    return res.status(200).json({ message: "successfully setup", data: imageUrl });
  } catch (error) {
   return res.status(500).json({ error: "Cannot setup 2FA", message: error });
  }
};


export const verify2FA = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = req.user; // Access the user from req
    if (!user) return res.status(400).json({ message: "User not available" });
    
    const { token } = req.body; // this is where there is error
    const verified = speakeasy.totp.verify({
      secret: user.userPreferences.twoFactorSecret,
      token,
      encoding: "base32",
    });
    console.log(verified)
    if (!verified)
      return res.status(500).json({ message: "2fa could not be verified" });

    const jwtToken = jwt.sign(
      { email: user.email },
      process.env.TOKEN_SECRET!,
      { expiresIn: 36000 }
    );

    return res.status(200).json({ message: "2fa successuly", data: jwtToken });
  } catch (error) {
    return res.status(500).json({ message: "2fa was notsuccessuly" });
  }
};

export const reset2FA = async (req: Request, res: Response) : Promise<any> => {
  try {
    const user = req.user
    if (!user) return res.status(400).json({ message: "User not available" });
    user.userPreferences.twoFactorSecret = null;
    user.userPreferences.enable2FA = false;
    await user.save();
    return res.status(200).json({ message: "2FA reset",})
  } catch (error) {
    return res.status(500).json({ message: "2fa was not successfully reset" });
  }
};
