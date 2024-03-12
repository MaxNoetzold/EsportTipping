import { GameEvent } from "../../../types/LecEvent";
import DateInfo from "./DateInfo";
import Teams from "./Teams";

function MatchElement({ match }: { match: GameEvent }) {
  console.log(match);
  const {
    startTime,
    match: { teams },
  } = match;

  return (
    <div className="flex items-center justify-evenly h-28 w-full border-t border-b border-gray-500">
      <DateInfo date={startTime} />
      <Teams teams={teams} />
    </div>
  );
}

export default MatchElement;
