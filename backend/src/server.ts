import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import scheduleRouter from "./routes/schedule";
import authRouter from "./routes/auth";
import sessionCheckMiddleware from "./middlewares/sessionCheck";

const app = express();

// add middlewares
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionCheckMiddleware);

// TODO: This is only for development, we should remove this in production -> Find a way to deactive this in production
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (origin && process.env.DEV_FRONTEND_IPS?.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
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
app.use("/api/auth", authRouter);

// General error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  // console.error(err.stack);

  res.status(err.status || 500).send({
    message: err.message || "Internal Server Error",
  });
});

export default app;
