import GameEvent from "../../utils/mongodb/schemas/GameEvent";
import { IGameEvent } from "../../utils/types/GameEvent";

const updateGameEventsInDatabase = async (gameEvents: IGameEvent[]) => {
  const bulkOps = gameEvents.map((gameEvent) => ({
    updateOne: {
      filter: { matchId: gameEvent.matchId },
      update: gameEvent,
      upsert: true,
    },
  }));

  const res = await GameEvent.bulkWrite(bulkOps);
};

export default updateGameEventsInDatabase;
