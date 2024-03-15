import { GameEvent } from "../../../types/LecEvent";
import DateInfo from "./DateInfo";
import MatchTip from "./MatchTip/MatchTip";
import Teams from "./Teams";

function MatchElement({ match }: { match: GameEvent }) {
  const {
    startTime,
    match: { teams },
  } = match;

  return (
    <div className="flex items-center justify-between h-28 w-full border-t border-b border-gray-500 p-3">
      <DateInfo date={startTime} />
      <Teams teams={teams} />
      <MatchTip match={match} />
    </div>
  );
}

export default MatchElement;
