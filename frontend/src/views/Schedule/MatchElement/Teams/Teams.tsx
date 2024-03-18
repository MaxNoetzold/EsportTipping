import { Team } from "../../../../types/LecEvent";
import MatchResult from "./MatchResult";
import SingleTeam from "./SingleTeam";

function Teams({ teams }: { teams: Team[] }) {
  return (
    <div className="flex justify-between items-center w-60">
      <SingleTeam team={teams[0]} isRightSide={false} />
      <MatchResult teams={teams} />
      <SingleTeam team={teams[1]} isRightSide />
    </div>
  );
}

export default Teams;
