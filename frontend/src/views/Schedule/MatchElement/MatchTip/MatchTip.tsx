import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getMeApi from "../../../../api/getMeApi";
import { GameEventWithTip } from "../../../../types/LecEvent";
import "./MatchTip.css";
import SvgTipFilter from "./SvgTipFilter";
import { useEffect, useState } from "react";
import postMatchTipApi from "../../../../api/postMatchTipApi";

function MatchTip({ match }: { match: GameEventWithTip }) {
  const queryClient = useQueryClient();

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
    if (tip?.winningTeamCode) {
      setTippedTeam(tip.winningTeamCode);
    }
  }, [tip]);

  const mutateTip = useMutation({
    mutationFn: (teamCode: string) => postMatchTipApi(match.matchId, teamCode),
    onMutate: (teamCode: string) => {
      if (!user) {
        throw { message: "You must be logged in to tip" };
      }
      setTippedTeam(teamCode);
      return tippedTeam;
    },
    onError: (error, variables, context) => {
      // TODO: Show error as notification
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
        <SvgTipFilter />
        {teams.map((team) => (
          <img
            className={`w-10 h-10 mb-2 flagTipHoverFilter ${
              tippedTeam === team.code && "flagTipSelectedTeamFilter"
            }`}
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
