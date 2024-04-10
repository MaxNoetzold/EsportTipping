import { GameEvent } from "../../utils/types/LecEvent";

const formatLecEvents = (events: any[]) => {
  const lecEvents: GameEvent[] = [];

  for (const event of events) {
    try {
      // Create a deep copy of the event object
      const eventCopy = JSON.parse(
        JSON.stringify(event, (key, value) => {
          if (key === "__typename") {
            return undefined;
          }
          return value;
        })
      );

      eventCopy.startTime = new Date(event.startTime);
      eventCopy.matchId = event.id;
      delete event.id;
      delete eventCopy.match.id;

      eventCopy.match.teams = event.match.matchTeams.map((team: any) => {
        return {
          name: team.name,
          code: team.code,
          image: team.image,
          result: team.result,
          record: team.record,
          side: team.side,
        };
      });

      delete eventCopy.match.state;

      lecEvents.push(eventCopy);
    } catch (error) {
      console.error("Error formatting LEC event", error, event);
      // continue to next event
    }
  }

  return lecEvents;
};

export default formatLecEvents;
