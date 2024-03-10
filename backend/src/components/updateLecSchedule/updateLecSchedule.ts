import { START_DATE_SPRING_2024 } from "../../utils/constants/splitTimes";
import { GameEvent } from "../../utils/types/LecEvent";
import fetchLecSchedule from "./fetchLecSchedule";
import updateLecMatchesInDatabase from "./updateLecMatchesInDatabase";

// TODO: This should only be run once per hour to not overload the lolesports servers
const updateLecSchedule = async () => {
  const events: Array<GameEvent> | undefined = await fetchLecSchedule();
  if (events) {
    const springSplitEvents: Array<GameEvent> = events.filter(
      (event: GameEvent) => event.startTime > START_DATE_SPRING_2024
    );

    await updateLecMatchesInDatabase(springSplitEvents);
  } else {
    throw new Error("No events found at lolesports");
  }
};

export default updateLecSchedule;
