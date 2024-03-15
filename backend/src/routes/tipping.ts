import express, { NextFunction, Response } from "express";
import { getCurrentSplit } from "../components/getLecSchedule";
import Request, {
  AuthedRequest,
} from "../utils/types/RequestWithSessionAndUser";
import userCheckMiddleware from "../middlewares/userCheck";
import getMatchTipsForSplit from "../components/getMatchTipsForSplit";

const tippingRouter = express.Router();

// get all your tips for a split
tippingRouter.get(
  "/",
  userCheckMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { split = getCurrentSplit() } = (req as AuthedRequest).query as {
        split?: string;
      };
      const { discordUserId } = (req as AuthedRequest).user;
      const tips = await getMatchTipsForSplit(split, discordUserId);

      res.status(200).json(tips);
    } catch (error) {
      next(error);
    }
  }
);

// create a new tip for a match
tippingRouter.post(
  "/",
  userCheckMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { matchId, teamId } = (req as AuthedRequest).body;
      const { discordUserId } = (req as AuthedRequest).user;

      res.status(200).json();
    } catch (error) {
      next(error);
    }
  }
);

export default tippingRouter;
