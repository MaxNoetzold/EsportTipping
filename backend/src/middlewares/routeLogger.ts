import { Response, NextFunction } from "express";
import Request from "../utils/types/RequestWithSessionAndUser";
import chalk from "chalk";

const routeLogger = (req: Request, res: Response, next: NextFunction) => {
  const userName = req.user?.globalName || "";
  res.on("finish", function () {
    console.log(
      chalk.green(req.method),
      decodeURI(req.url),
      res.statusCode,
      res.statusMessage,
      chalk.blue(userName)
    );
  });
  next();
};

export default routeLogger;
