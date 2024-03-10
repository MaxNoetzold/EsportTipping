import express, { Request, Response } from "express";
import scheduleRouter from "./routes/schedule";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/api/schedule", scheduleRouter);

export default app;
