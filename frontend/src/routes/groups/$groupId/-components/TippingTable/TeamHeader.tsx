import { Team } from "../../../../../types/LecEvent";

function TeamHeader({ teams }: { teams: Team[] }) {
  const getColorOfTeam = (team: Team) => {
    const noWinner =
      teams[0].result.outcome === null || teams[1].result.outcome === null;
    const winner =
      teams[0].result.outcome === "win" ? teams[0].code : teams[1].code;

    if (noWinner) {
      return "white";
    }
    if (winner === team.code) {
      return "green";
    }
    return "red";
  };

  return (
    <>
      <p
        style={{
          color: getColorOfTeam(teams[0]),
        }}
      >
        {teams[0].code}
      </p>{" "}
      -{" "}
      <p
        style={{
          color: getColorOfTeam(teams[1]),
        }}
      >
        {teams[1].code}
      </p>
    </>
  );
}

export default TeamHeader;
