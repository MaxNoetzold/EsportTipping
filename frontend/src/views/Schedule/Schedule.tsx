import { useQuery } from "@tanstack/react-query";
import getMatchesApi from "../../api/getMatchesApi";
import Loading from "../../components/Loading";
import MatchElement from "./MatchElement/MatchElement";
import { IGameEvent } from "../../types/GameEvent";
import getMatchTipsApi from "../../api/getMatchTipsApi";
import { useErrorSnackbar } from "../../components/ErrorSnackbar";
import { useEffect } from "react";
import isNextMatch from "./isNextMatch";

type ScheduleProps = {
  league: string | undefined;
  tournament: string | undefined;
};

function Schedule(props: ScheduleProps) {
  const showError = useErrorSnackbar();

  const { league, tournament } = props;

  const {
    isPending,
    data: matches,
    error: matchesError,
  } = useQuery({
    enabled: !!league,
    queryKey: ["matches", league, tournament],
    queryFn: () => getMatchesApi({ league, tournament }),
  });
  const { data: tips, error: tipsError } = useQuery({
    enabled: !!league,
    queryKey: ["tips", "me", league, tournament],
    queryFn: () => getMatchTipsApi({ league, tournament }),
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
    <>
      {matchesWithTips.map((match: IGameEvent) => (
        <MatchElement
          match={match}
          isNext={isNextMatch(match.matchId, matchesWithTips)}
          key={match.matchId}
        />
      ))}
    </>
  );
}

export default Schedule;
