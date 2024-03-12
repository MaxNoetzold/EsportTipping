import { Team } from "../../../../types/LecEvent";
import SingleTeam from "./SingleTeam";

function Teams({ teams }: { teams: Team[] }) {
  return (
    <div className="flex justify-between items-center w-60">
      <SingleTeam team={teams[0]} isRightSide={false} />
      <p className="text-md font-semibold">vs.</p>
      <SingleTeam team={teams[1]} isRightSide />
    </div>
  );
}

export default Teams;
