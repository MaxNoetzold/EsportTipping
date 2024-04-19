import MatchTipModel from "../../utils/mongodb/schemas/MatchTip";
import getGameEventsForTournament from "../getGameEventsForTournament";

const getMatchTipsForSplit = async (
  splitName: string,
  discordUserId: string
) => {
  const matches = await getGameEventsForTournament(splitName);
  const matchIds = matches.map((match) => match.matchId);

  const tips = await MatchTipModel.find({
    discordUserId,
    matchId: { $in: matchIds },
  }).lean();

  return tips;
};

export default getMatchTipsForSplit;
