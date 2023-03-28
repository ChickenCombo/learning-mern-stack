import { Dispatch } from "react";
import { WorkoutActions } from "./Actions";

export interface Workout {
  _id: string;
  title: string;
  reps: number;
  load: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface WorkoutsState {
  workouts: Array<Workout> | null;
}

export interface WorkoutsContextType extends WorkoutsState {
  dispatch: Dispatch<Action>;
}

export type Action =
  | { type: WorkoutActions.SET_WORKOUTS; payload: Workout[] }
  | { type: WorkoutActions.CREATE_WORKOUTS; payload: Workout };
