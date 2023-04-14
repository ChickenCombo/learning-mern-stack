import express, { Router } from "express";
import {
  createWorkout,
  deleteWorkout,
  getWorkout,
  getWorkouts,
  updateWorkout,
} from "../controllers/workoutContoller";
import requireAuth from "../middleware/requireAuth";

const router: Router = express.Router();

router.use(requireAuth);

router.get("/", getWorkouts);

router.get("/:id", getWorkout);

router.post("/", createWorkout);

router.delete("/:id", deleteWorkout);

router.patch("/:id", updateWorkout);

export default router;
