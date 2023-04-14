import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

interface UserRequest extends Request {
  user?: unknown;
}

const requireAuth = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET_KEY!) as {
      _id: string;
    };

    req.user = await User.findOne({ _id }).select("_id");

    next();
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An error occurred while verifying token.";
    res.status(400).json({ error: errorMessage });
  }
};

export default requireAuth;
