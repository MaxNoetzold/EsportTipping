import { IGameEvent } from "../../types/GameEvent";

const isNextMatch = (matchId: string, matches: IGameEvent[]) => {
  // The next match is the first match that has a state that is not "completed"
  const nextMatch = matches.find((match) => match.state !== "completed");
  return nextMatch?.matchId === matchId;
};

export default isNextMatch;
