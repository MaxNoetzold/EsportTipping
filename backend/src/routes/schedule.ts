import express, { NextFunction, Request, Response } from "express";
import updateLecSchedule from "../components/updateLecSchedule";
import getLecScheduleForSplit, {
  getCurrentSplit,
} from "../components/getLecSchedule";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { split = getCurrentSplit() } = req.query as { split?: string };

    const matches = await getLecScheduleForSplit(split);

    res.status(200).json(matches);
  } catch (error) {
    next(error);
  }
});

// Get latest data from lolesports and update the database
router.post("/", async (req: Request, res: Response) => {
  try {
    await updateLecSchedule();
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

export default router;
