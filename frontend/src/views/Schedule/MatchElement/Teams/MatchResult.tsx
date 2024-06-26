import { ITeam } from "../../../../types/GameEvent";

function MatchResult({ teams }: { teams: ITeam[] }) {
  const displayResult =
    teams[0].result.outcome === null || teams[1].result.outcome === null
      ? "vs."
      : `${teams[0].result.gameWins} : ${teams[1].result.gameWins}`;

  return <p className="text-md font-semibold text-gray-500">{displayResult}</p>;
}

export default MatchResult;
