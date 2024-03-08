import { GameEvent } from "../../types/LecEvent";

const formatLecEvents = (events: any[]) => {
  const lecEvents: GameEvent[] = [];

  for (const event of events) {
    const startTime = new Date(event.startTime);
    const matchId = event.match.id;

    const newEvent = { ...event, startTime, matchId };
    delete newEvent.match.id;

    lecEvents.push(newEvent);
  }

  return lecEvents;
};

export default formatLecEvents;
