import { GameEvent } from "../../../types/LecEvent";
import DateInfo from "./DateInfo";
import MatchTip from "./MatchTip/MatchTip";
import Teams from "./Teams";
import { useRef, useEffect } from "react";

function MatchElement({
  match,
  isNext,
}: {
  match: GameEvent;
  isNext: boolean;
}) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isNext && elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: "instant" });
      window.scrollBy(0, -80); // scroll up by 80px to move away from the fixed header navbar
    }
  }, [isNext]);

  const {
    startTime,
    match: { teams },
  } = match;

  return (
    <div
      ref={elementRef}
      className="flex items-center justify-between h-28 w-full border-t border-b border-gray-500 p-3"
    >
      <DateInfo date={startTime} />
      <Teams teams={teams} />
      <MatchTip match={match} />
    </div>
  );
}

export default MatchElement;
