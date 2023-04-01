import { Request, Response } from "express";
import mongoose from "mongoose";
import Workout from "../models/workoutModel";

export const getWorkouts = async (req: Request, res: Response) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
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

export const createWorkout = async (req: Request, res: Response) => {
  const { title, reps, load } = req.body;

  let emptyFields: Array<string> = [];

  if (!title) emptyFields.push("title");
  if (!load) emptyFields.push("load");
  if (!reps) emptyFields.push("reps");

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the missing fields!', emptyFields });
  }

  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: "Invalid input"});
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
