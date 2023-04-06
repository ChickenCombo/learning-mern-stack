import { Request, Response } from "express";
import User from "../models/userModel";

export const loginUser = async (req: Request, res: Response) => {
  res.json({ message: 'User logged in' })
}

export const signupUser = async (req: Request, res: Response) => {
  res.json({ message: 'User signed up' })
}