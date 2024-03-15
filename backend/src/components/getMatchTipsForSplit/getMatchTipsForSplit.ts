import MatchTipModel from "../../utils/mongodb/schemas/MatchTip";
import getLecScheduleForSplit from "../getLecSchedule";

const getMatchTipsForSplit = async (
  splitName: string,
  discordUserId: string
) => {
  const matches = await getLecScheduleForSplit(splitName);
  const matchIds = matches.map((match) => match.id);

  const tips = await MatchTipModel.find({
    discordUserId,
    matchId: { $in: matchIds },
  }).lean();

  return tips;
};

export default getMatchTipsForSplit;
