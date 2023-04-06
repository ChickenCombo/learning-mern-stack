import { Request, Response } from "express";
import User from "../models/userModel";

export const loginUser = async (req: Request, res: Response) => {
  res.json({ message: 'User logged in' })
}

export const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.signUp(email, password);

    res.status(200).json({ email, user });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred while signing up the user.';
    res.status(400).json({ error: errorMessage });
  }
}