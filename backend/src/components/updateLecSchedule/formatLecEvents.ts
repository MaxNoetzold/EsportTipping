import { GameEvent } from "../../types/LecEvent";

const formatLecEvents = (events: any[]) => {
  const lecEvents: GameEvent[] = [];

  for (const event of events) {
    // Create a deep copy of the event object
    const eventCopy = JSON.parse(JSON.stringify(event));

    eventCopy.startTime = new Date(event.startTime);
    eventCopy.matchId = event.match.id;
    delete eventCopy.match.id;

    lecEvents.push(eventCopy);
  }

  return lecEvents;
};

export default formatLecEvents;
