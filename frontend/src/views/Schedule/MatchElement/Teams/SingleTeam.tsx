import { ITeam } from "../../../../types/GameEvent";

function SingleTeam({
  team,
  isRightSide,
}: {
  team: ITeam;
  isRightSide: boolean;
}) {
  return (
    <div className="flex flex-row items-center w-24 justify-between">
      {!isRightSide && (
        <p className="text-md font-semibold text-white">{team.code}</p>
      )}
      <img
        className="w-16 h-16 mb-2"
        src={team.image}
        alt={`${team.code} flag`}
      />
      {isRightSide && (
        <p className="text-md font-semibold text-white">{team.code}</p>
      )}
    </div>
  );
}

export default SingleTeam;
