import { GameEvent } from "../../types/LecEvent";
import fetchLecSchedule from "./fetchLecSchedule";
import updateLecMatchesInDatabase from "./updateLecMatchesInDatabase";

const START_DATE_SPRING_2024 = new Date("2024-03-09T00:00:00Z");

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
