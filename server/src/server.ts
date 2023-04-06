import express, { Express, NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import cors from 'cors';
import workoutRoutes from "./routes/workouts";
import userRoutes from "./routes/user";
import * as dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT!;
const mongo: string = process.env.MONGO_URI!;

app.use(cors());

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoutes);

app.use("/api/user", userRoutes);

mongoose
  .connect(mongo)
  .then(() => {
    app.listen(port, () => {
      console.log("Listening to port", port);
    });
  })
  .catch((error) => {
    console.log(error);
  })
