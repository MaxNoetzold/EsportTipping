import GameEvent from "../../utils/mongodb/schemas/GameEvent";
import getSplitTimes from "./getSplitTimes";

const getLecScheduleForSplit = async (splitName: string) => {
  const splitTimes = getSplitTimes(splitName);
  // get all matches from database between start and end date
  const matches = await GameEvent.find({
    startTime: { $gte: splitTimes.start, $lte: splitTimes.end },
    ["match.teams.0.name"]: { $ne: "TBD" },
  });
  return matches;
};

export default getLecScheduleForSplit;
