import formatLecEvents from "../formatLecEvents";
import { GameEvent } from "../../../utils/types/LecEvent";
import LecMatchModel from "../../../utils/mongodb/schemas/LecMatch";
import springSplit2024RegularSchedule from "../../../test/exampleData/unformatedSpringSplit2024RegularSchedule.json";

it("should correctly format events", () => {
  const events: any[] = JSON.parse(
    JSON.stringify(springSplit2024RegularSchedule)
  );
  // only keep the first 10 events
  events.splice(10);

  // Call the function with the data from the file
  const formattedEvents: GameEvent[] = formatLecEvents(events);

  // Validate each formatted event by checking if it fits the LecMatchModel schema
  for (let i = 0; i < formattedEvents.length; i++) {
    const event = new LecMatchModel(formattedEvents[i]);
    let error = event.validateSync();
    expect(error).toBeUndefined();
  }
});
