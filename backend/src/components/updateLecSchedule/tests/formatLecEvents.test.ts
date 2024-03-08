import formatLecEvents from "../formatLecEvents";
import { GameEvent } from "../../../types/LecEvent";
import fs from "fs";
import path from "path";
import LecMatchModel from "../../../mongodb/schemas/LecMatch";

describe("formatLecEvents", () => {
  it("should correctly format events", () => {
    // Read data from JSON file
    const rawData = fs.readFileSync(
      path.resolve(__dirname, "springSplit2024RegularSchedule.json"),
      "utf-8"
    );
    const events: any[] = JSON.parse(rawData);
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
});
