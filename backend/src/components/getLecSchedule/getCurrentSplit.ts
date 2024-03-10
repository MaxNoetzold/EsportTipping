import {
  END_DATE_SPRING_2024,
  START_DATE_SPRING_2024,
} from "../../utils/constants/splitTimes";

const getCurrentSplit = () => {
  const now = new Date();
  if (
    now > new Date(START_DATE_SPRING_2024) &&
    now < new Date(END_DATE_SPRING_2024)
  ) {
    return "2024_spring";
  }
  throw new Error("No matching split found");
};

export default getCurrentSplit;
