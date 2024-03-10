import LecMatchModel from "../../utils/mongodb/schemas/LecMatch";
import getSplitTimes from "./getSplitTimes";

const getLecScheduleForSplit = async (splitName: string) => {
  const splitTimes = getSplitTimes(splitName);
  // get all matches from database between start and end date
  const matches = await LecMatchModel.find({
    startTime: { $gte: splitTimes.start, $lte: splitTimes.end },
  });
  return matches;
};

export default getLecScheduleForSplit;
