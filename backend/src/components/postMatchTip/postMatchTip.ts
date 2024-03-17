import LecMatchModel from "../../utils/mongodb/schemas/LecMatch";
import MatchTipModel from "../../utils/mongodb/schemas/MatchTip";

const postMatchTip = async (
  matchId: string,
  tippedTeamCode: string,
  discordUserId: string
) => {
  // get the match
  const match = await LecMatchModel.findOne({ matchId }).lean();
  if (!match) {
    throw new Error("Match not found");
  }

  // check that the match is at least 1 hour in the future
  if (new Date(match.startTime) < new Date(Date.now() + 1000 * 60 * 60)) {
    throw new Error("Match has already started");
  }

  // upsert the tip
  const newTip = await MatchTipModel.findOneAndUpdate(
    { matchId, discordUserId },
    { matchId, tippedTeamCode, discordUserId },
    { upsert: true, new: true }
  ).lean();

  return newTip;
};

export default postMatchTip;
