import { MatchTip } from "../../../../../types/MatchTip";

function TipCell({ tips, matchId }: { tips: MatchTip[]; matchId: string }) {
  const tip = tips.find((tip) => tip.matchId === matchId);

  const getColor = () => {
    if (!tip?.winningTeamCode) {
      return "white";
    }
    if (tip?.winningTeamCode === tip?.tippedTeamCode) {
      return "green";
    }
    return "red";
  };
  return (
    <td
      key={tip?._id}
      className="border px-4 py-2"
      style={{
        color: getColor(),
      }}
    >
      {tip?.tippedTeamCode || "-"}
    </td>
  );
}

export default TipCell;
