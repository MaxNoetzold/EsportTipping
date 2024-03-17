import { GameEvent } from "../../utils/types/LecEvent";

const formatLecEvents = (events: any[]) => {
  const lecEvents: GameEvent[] = [];

  for (const event of events) {
    try {
      // Create a deep copy of the event object
      const eventCopy = JSON.parse(JSON.stringify(event));

      eventCopy.startTime = new Date(event.startTime);
      eventCopy.matchId = event.match.id;
      delete eventCopy.match.id;

      lecEvents.push(eventCopy);
    } catch (error) {
      console.error("Error formatting LEC event", error, event);
      // continue to next event
    }
  }

  return lecEvents;
};

export default formatLecEvents;
