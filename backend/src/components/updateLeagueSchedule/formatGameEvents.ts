import { IGameEvent } from "../../utils/types/GameEvent";

const formatGameEvents = (events: any[]) => {
  const gameEvents: IGameEvent[] = [];

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
      delete eventCopy.id;
      delete eventCopy.match.id;

      eventCopy.match.teams = eventCopy.match.matchTeams.map((team: any) => {
        return {
          name: team.name,
          code: team.code,
          image: team.image,
          result: team.result,
          record: team.record,
          side: team.side,
        };
      });

      delete eventCopy.match.matchTeams;
      delete eventCopy.match.state;

      gameEvents.push(eventCopy);
    } catch (error) {
      console.error("Error formatting Game event", error, event);
      // continue to next event
    }
  }

  return gameEvents;
};

export default formatGameEvents;
