import express, { NextFunction, Response } from "express";
import Request, {
  AuthedRequest,
} from "../utils/types/RequestWithSessionAndUser";
import userCheckMiddleware from "../middlewares/userCheck";
import getMatchTipsForSplit from "../components/getMatchTipsForSplit";
import postMatchTip from "../components/postMatchTip";
import getLatestSplitForLeague from "../components/getLatestSplitForTournament";

const tippingRouter = express.Router();

// get all your tips for a split
tippingRouter.get(
  "/",
  userCheckMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { league = "lec" } = req.query as {
        league?: string;
        split?: string;
      };
      const { split = await getLatestSplitForLeague(league) } = req.query as {
        league?: string;
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
      const { matchId, teamCode } = (req as AuthedRequest).body;
      const { discordUserId } = (req as AuthedRequest).user;

      const newTip = await postMatchTip(matchId, teamCode, discordUserId);

      res.status(200).json(newTip);
    } catch (error) {
      next(error);
    }
  }
);

export default tippingRouter;
