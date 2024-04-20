import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import scheduleRouter from "./routes/schedule";
import authRouter from "./routes/auth";
import sessionCheckMiddleware from "./middlewares/sessionCheck";
import routeLogger from "./middlewares/routeLogger";
import tippingRouter from "./routes/tipping";
import bodyParser from "body-parser";
import tippingGroupRouter from "./routes/groups";
import leagueRouter from "./routes/league";

const app = express();

// add middlewares
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(bodyParser.json());
app.use(sessionCheckMiddleware);
app.use(routeLogger);

if (process.env.NODE_ENV !== "production") {
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
}

app.use(express.static("frontend"));

app.use("/api/schedule", scheduleRouter);
app.use("/api/auth", authRouter);
app.use("/api/tipping", tippingRouter);
app.use("/api/groups", tippingGroupRouter);
app.use("/api/leagues", leagueRouter);

app.get("*", (req: Request, res: Response) => {
  res.sendFile("index.html", { root: "frontend" });
});

// General error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  // console.error(err.stack);

  res.status(err.status || 500).send({
    message: err.message || "Internal Server Error",
  });
});

export default app;
