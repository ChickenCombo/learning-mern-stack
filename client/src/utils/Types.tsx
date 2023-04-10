import { Dispatch } from "react";
import { AuthActions, WorkoutActions } from "./Actions";

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
  dispatch: Dispatch<WorkoutAction>;
}

export type WorkoutAction =
  | { type: WorkoutActions.SET_WORKOUTS; payload: Workout[] }
  | { type: WorkoutActions.CREATE_WORKOUTS; payload: Workout }
  | { type: WorkoutActions.DELETE_WORKOUT; payload: Workout };

export interface AuthState {
  user: string | null;
}

export interface AuthContextType extends AuthState {
  dispatch: Dispatch<AuthAction>;
}

export type AuthAction =
  | { type: AuthActions.LOGIN; payload: string }
  | { type: AuthActions.LOGOUT };
