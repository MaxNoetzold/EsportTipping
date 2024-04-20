import express, { NextFunction, Response } from "express";
import getGameEventsForTournament from "../components/getGameEventsForTournament";
import getLatestSplitForLeague from "../components/getLatestSplitForTournament";
import Request from "../utils/types/RequestWithSessionAndUser";
import updateMatchTips from "../components/updateMatchTips";
import updateLeagueSchedule from "../components/updateLeagueSchedule";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const { league = "lec" } = req.query as {
    league?: string;
    tournament?: string;
  };
  try {
    const { tournament = await getLatestSplitForLeague(league) } =
      req.query as {
        league?: string;
        tournament?: string;
      };

    const matches = await getGameEventsForTournament(tournament);

    res.status(200).json(matches);
  } catch (error) {
    next(error);
  }

  // Get the latest data from lolesports and update the database
  try {
    await updateLeagueSchedule(league);
    /*
      NOTE:
       Unfortunately, I cant automate the call of this function with mongoose middleware
       I write the matches with a bulkWrite which bypasses middlewares
       therefore, I have to call this function manually and not forget it in case of a new place of match updates
   
    */
    await updateMatchTips();
  } catch (error) {
    console.error("Trying to update the data from lolesports", error);
  }
});

export default router;
