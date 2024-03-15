import { Response, NextFunction } from "express";
import Request from "../utils/types/RequestWithSessionAndUser";

const userCheckMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

export default userCheckMiddleware;
