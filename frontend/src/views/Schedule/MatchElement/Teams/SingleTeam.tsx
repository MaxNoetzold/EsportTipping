import { Team } from "../../../../types/LecEvent";

function SingleTeam({
  team,
  isRightSide,
}: {
  team: Team;
  isRightSide: boolean;
}) {
  return (
    <div className="flex flex-row items-center w-24 justify-between">
      {!isRightSide && <p className="text-md font-semibold">{team.code}</p>}
      <img
        className="w-16 h-16 mb-2"
        src={team.image}
        alt={`${team.code} flag`}
      />
      {isRightSide && <p className="text-md font-semibold">{team.code}</p>}
    </div>
  );
}

export default SingleTeam;
