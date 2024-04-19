import {
  END_DATE_SPRING_2024,
  START_DATE_SPRING_2024,
} from "../../utils/constants/splitTimes";
import { IGameEvent } from "../../utils/types/GameEvent";
import fetchLecSchedule from "./fetchLecSchedule";
import updateLecMatchesInDatabase from "./updateLecMatchesInDatabase";

const updateLecSchedule = async () => {
  const events: Array<IGameEvent> | undefined = await fetchLecSchedule();
  if (events) {
    const springSplitEvents: Array<IGameEvent> = events.filter(
      (event: IGameEvent) =>
        event.startTime >= START_DATE_SPRING_2024 &&
        event.startTime <= END_DATE_SPRING_2024
    );

    await updateLecMatchesInDatabase(springSplitEvents);
  } else {
    throw new Error("No events found at lolesports");
  }
};

export default updateLecSchedule;
