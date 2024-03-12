import express, { NextFunction, Request, Response } from "express";
import scheduleRouter from "./routes/schedule";

const app = express();

// TODO: This is only for development, we should remove this in production -> Find a way to deactive this in production
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (origin && process.env.DEV_FRONTEND_IPS?.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Authorization"
  );
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // so we can send cookies
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use("/api/schedule", scheduleRouter);

// General error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  // console.error(err.stack);

  res.status(err.status || 500).send({
    message: err.message || "Internal Server Error",
  });
});

export default app;
