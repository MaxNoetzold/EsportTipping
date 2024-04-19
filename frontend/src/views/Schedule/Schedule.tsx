import { useQuery } from "@tanstack/react-query";
import getMatchesApi from "../../api/getMatchesApi";
import Loading from "../../components/Loading";
import MatchElement from "./MatchElement/MatchElement";
import { IGameEvent } from "../../types/GameEvent";
import getMatchTipsApi from "../../api/getMatchTipsApi";
import { useErrorSnackbar } from "../../components/ErrorSnackbar";
import { useEffect } from "react";
import isNextMatch from "./isNextMatch";

function Schedule() {
  const showError = useErrorSnackbar();

  const {
    isPending,
    data: matches,
    error: matchesError,
  } = useQuery({
    queryKey: ["matches", "spring"],
    queryFn: () => getMatchesApi("spring_2024"),
  });
  const { data: tips, error: tipsError } = useQuery({
    queryKey: ["tips", "spring", "me"],
    queryFn: () => getMatchTipsApi("spring_2024"),
  });

  useEffect(() => {
    if (matchesError) {
      console.log(matchesError);
      showError(matchesError.message);
    }
    if (tipsError) {
      showError(tipsError.message);
    }
  }, [matchesError, tipsError, showError]);

  if (isPending) {
    return <Loading />;
  }

  const matchesWithTips = (matches || []).map((match: IGameEvent) => {
    const tip = tips?.find((t) => t.matchId === match.matchId);
    return { ...match, tip };
  });

  return (
    <div className="w-full">
      {matchesWithTips.map((match: IGameEvent) => (
        <MatchElement
          match={match}
          isNext={isNextMatch(match.matchId, matchesWithTips)}
          key={match.matchId}
        />
      ))}
    </div>
  );
}

export default Schedule;
