import GameEvent from "../../utils/mongodb/schemas/GameEvent";
import { IGameEvent } from "../../utils/types/GameEvent";

const updateLecMatchesInDatabase = async (lecMatches: IGameEvent[]) => {
  const bulkOps = lecMatches.map((lecMatch) => ({
    updateOne: {
      filter: { matchId: lecMatch.matchId },
      update: lecMatch,
      upsert: true,
    },
  }));

  const res = await GameEvent.bulkWrite(bulkOps);
};

export default updateLecMatchesInDatabase;
