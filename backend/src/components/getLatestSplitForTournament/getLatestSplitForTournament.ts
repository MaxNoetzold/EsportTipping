import GameEvent from "../../utils/mongodb/schemas/GameEvent";

const getLatestSplitForLeague = async (leagueSlug: string) => {
  // get the latest game match for the league
  const latestGameMatch = await GameEvent.findOne({
    "league.slug": leagueSlug,
  })
    .sort({ startTime: -1 })
    .lean();
  if (!latestGameMatch) {
    throw new Error(`No matching split found for the league: ${leagueSlug}`);
  }

  return latestGameMatch.tournament.slug;
};

export default getLatestSplitForLeague;
