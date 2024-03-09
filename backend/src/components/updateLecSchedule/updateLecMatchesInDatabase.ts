import LecMatchModel from "../../mongodb/schemas/LecMatch";
import { GameEvent } from "../../types/LecEvent";

const updateLecMatchesInDatabase = async (lecMatches: GameEvent[]) => {
  const bulkOps = lecMatches.map((lecMatch) => ({
    updateOne: {
      filter: { matchId: lecMatch.matchId },
      update: lecMatch,
      upsert: true,
    },
  }));

  await LecMatchModel.bulkWrite(bulkOps);
};

export default updateLecMatchesInDatabase;
