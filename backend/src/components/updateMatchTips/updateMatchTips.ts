import GameEvent from "../../utils/mongodb/schemas/GameEvent";
import MatchTipModel from "../../utils/mongodb/schemas/MatchTip";

const updateMatchTips = async () => {
  // get all matchtIds of match tips without a "winningTeamCode" value
  const distinctMatchIds = await MatchTipModel.distinct("matchId", {
    winningTeamCode: null,
  });
  // get all matches of these tips with match.teams[0].result.outcome === "win" | "loss"
  const matches = await GameEvent.find({
    matchId: { $in: distinctMatchIds },
    $or: [
      { "match.teams.0.result.outcome": "win" },
      { "match.teams.0.result.outcome": "loss" },
    ],
  }).lean();
  // for each match, update the match tip with the "winningTeamCode" value
  const bulkOps = matches.map((match) => {
    const winningTeam = match.match?.teams?.find(
      (team) => team.result?.outcome === "win"
    );
    return {
      updateMany: {
        filter: { matchId: match.matchId },
        update: { winningTeamCode: winningTeam?.code },
      },
    };
  });
  await MatchTipModel.bulkWrite(bulkOps);
};

export default updateMatchTips;
