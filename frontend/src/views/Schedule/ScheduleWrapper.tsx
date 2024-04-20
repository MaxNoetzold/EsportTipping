import { useState } from "react";
import Filterbar from "./Filterbar";
import Schedule from "./Schedule";

function ScheduleWrapper() {
  const [league, setLeague] = useState<string>();
  const [tournament, setTournament] = useState<string>();

  return (
    <div className="w-full">
      <Filterbar
        league={league}
        setLeague={setLeague}
        tournament={tournament}
        setTournament={setTournament}
      />
      <Schedule league={league} tournament={tournament} />
    </div>
  );
}

export default ScheduleWrapper;
