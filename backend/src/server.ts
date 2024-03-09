import express, { Request, Response } from "express";
import updateLecSchedule from "./components/updateLecSchedule";
import fs from "fs";
import formatLecEvents from "./components/updateLecSchedule/formatLecEvents";
import path from "path";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.post("/updateSchedule", async (req: Request, res: Response) => {
  try {
    await updateLecSchedule();
    res.status(200).send("Schedule updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the schedule");
  }
});

export default app;
