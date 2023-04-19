import { Request, Response } from "express";
import mongoose from "mongoose";
import Workout from "../models/workoutModel";

interface UserRequest extends Request {
  user?: any;
}

export const getWorkouts = async (req: UserRequest, res: Response) => {
  const user_id = req.user._id;
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

export const getWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "Workout doesn't exist!" });
  }

  res.status(200).json(workout);
};

export const createWorkout = async (req: UserRequest, res: Response) => {
  const { title, reps, load } = req.body;

  let emptyFields: Array<string> = [];

  if (!title) emptyFields.push("title");
  if (!load) emptyFields.push("load");
  if (!reps) emptyFields.push("reps");

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the missing fields!", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An error occurred while creating a new workout.";
    res.status(400).json({ error: errorMessage });
  }
};

export const deleteWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid ID" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    return res.status(404).json({ error: "Workout doesn't exist!" });
  }

  res.status(200).json(workout);
};

export const updateWorkout = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.send(404).json({ error: "Invalid ID" });
  }

  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!workout) {
    return res.status(404).json({ error: "Workout doesn't exist! " });
  }

  res.status(200).json(workout);
};
