import {
  END_DATE_SPRING_2024,
  START_DATE_SPRING_2024,
} from "../../utils/constants/splitTimes";

const getSplitTimes = (splitName: string) => {
  switch (splitName) {
    case "2024_spring": {
      return {
        start: START_DATE_SPRING_2024,
        end: END_DATE_SPRING_2024,
      };
    }
    default:
      throw new Error("Invalid split name");
  }
};

export default getSplitTimes;
