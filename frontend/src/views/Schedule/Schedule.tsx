import { useQuery } from "@tanstack/react-query";
import getMatchesApi from "../../api/getMatchesApi";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";
import MatchElement from "./MatchElement/MatchElement";
import { GameEvent } from "../../types/LecEvent";
import getMatchTipsApi from "../../api/getMatchTipsApi";

function Schedule() {
  const {
    isPending,
    isError,
    data: matches,
    error,
  } = useQuery({
    queryKey: ["matches", "spring"],
    queryFn: () => getMatchesApi("2024_spring"),
  });
  const {
    data: tips,
    // error: tipsError,
  } = useQuery({
    queryKey: ["tips", "spring", "me"],
    queryFn: () => getMatchTipsApi("2024_spring"),
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError && error) {
    return <Alert message={error.message} />;
  }

  const matchesWithTips = matches.map((match: GameEvent) => {
    const tip = tips?.find((t) => t.matchId === match.matchId);
    return { ...match, tip };
  });

  return (
    <div className="w-full">
      {matchesWithTips.map((match: GameEvent) => (
        <MatchElement match={match} key={match.matchId} />
      ))}
    </div>
  );
}

export default Schedule;
