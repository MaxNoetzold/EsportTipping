import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getMeApi from "../../../../api/getMeApi";
import { IGameEventWithTip } from "../../../../types/GameEvent";
import "./MatchTip.css";
import SvgTipFilter from "./SvgTipFilter";
import { useEffect, useState } from "react";
import postMatchTipApi from "../../../../api/postMatchTipApi";
import { useErrorSnackbar } from "../../../../components/ErrorSnackbar";

const getTeamFlagBorderClass = (
  tippedTeam: string | null,
  teamCode: string,
  winningTeamCode: string | undefined
) => {
  if (tippedTeam === teamCode) {
    if (!winningTeamCode) {
      return "flagTipSelectedTeamBorder";
    } else if (teamCode !== winningTeamCode) {
      return "flagTipIncorrectTeamBorder";
    } else if (teamCode === winningTeamCode) {
      return "flagTipCorrectTeamBorder";
    }
  }
  return "";
};

function MatchTip({ match }: { match: IGameEventWithTip }) {
  const queryClient = useQueryClient();
  const showError = useErrorSnackbar();

  const [tippedTeam, setTippedTeam] = useState<string | null>(null);
  const {
    tip,
    match: { teams },
  } = match;

  const { data: user } = useQuery({
    queryKey: ["user", "me"],
    queryFn: getMeApi,
  });

  useEffect(() => {
    if (tip?.tippedTeamCode) {
      setTippedTeam(tip.tippedTeamCode);
    }
  }, [tip]);

  const mutateTip = useMutation({
    mutationFn: (teamCode: string) => postMatchTipApi(match.matchId, teamCode),
    onMutate: (teamCode: string) => {
      if (!user) {
        throw new Error("You must be logged in to tip");
      }
      setTippedTeam(teamCode);
      return tippedTeam;
    },
    onError: (error, _variables, context) => {
      showError(error.message);
      if (context) {
        setTippedTeam(context);
      } else {
        setTippedTeam(null);
      }
    },
    onSuccess() {
      queryClient.fetchQuery({
        queryKey: ["tips", "spring", "me"],
      });
    },
  });

  return (
    <div className="flex flex-col items-center w-28">
      <div className="text-base text-gray-500 mb-2">Who wins?</div>
      <div className="flex flex-row items-center w-24 justify-between">
        <SvgTipFilter color="green" />
        <SvgTipFilter color="yellow" />
        <SvgTipFilter color="red" />
        <SvgTipFilter color="gray" />
        {teams.map((team) => (
          <img
            className={`w-10 h-10 mb-2 flagTipHoverFilter ${getTeamFlagBorderClass(
              tippedTeam,
              team.code,
              tip?.winningTeamCode
            )}`}
            src={team.image}
            alt={`${team.code} flag`}
            onClick={() => mutateTip.mutate(team.code)}
            key={team.code}
          />
        ))}
      </div>
    </div>
  );
}

export default MatchTip;
