import { Request, Response } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

const createToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY!, { expiresIn: '3d'});
}

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while logging in.';
    res.status(400).json({ error: errorMessage });
  }
}

export const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.signUp(email, password);

    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while signing up the user.';
    res.status(400).json({ error: errorMessage });
  }
}