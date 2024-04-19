import GameEvent from "../../utils/mongodb/schemas/GameEvent";

const getGameEventsForTournament = async (tournamentSlug: string) => {
  const matches = await GameEvent.find({
    ["tournament.slug"]: tournamentSlug,
    ["match.teams.0.name"]: { $ne: "TBD" },
  });
  return matches;
};

export default getGameEventsForTournament;
