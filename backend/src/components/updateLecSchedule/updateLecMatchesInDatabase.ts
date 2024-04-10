import LecMatchModel from "../../utils/mongodb/schemas/LecMatch";
import { GameEvent } from "../../utils/types/LecEvent";

const updateLecMatchesInDatabase = async (lecMatches: GameEvent[]) => {
  const bulkOps = lecMatches.map((lecMatch) => ({
    updateOne: {
      filter: { matchId: lecMatch.matchId },
      update: lecMatch,
      upsert: true,
    },
  }));

  const res = await LecMatchModel.bulkWrite(bulkOps);
};

export default updateLecMatchesInDatabase;
