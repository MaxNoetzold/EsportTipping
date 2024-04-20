import { useQuery } from "@tanstack/react-query";
import { GroupTips, TippingGroup } from "../../../../../types/TippingGroup";
import getMatchesApi from "../../../../../api/getMatchesApi";
import Loading from "../../../../../components/Loading";
import { useErrorSnackbar } from "../../../../../components/ErrorSnackbar";
import { useEffect } from "react";
import TeamHeader from "./TeamHeader";
import TipCell from "./TipCell";

function TippingTable({
  group,
  tips,
  league,
  tournament,
}: {
  group: TippingGroup;
  tips: GroupTips;
  league: string | undefined;
  tournament: string | undefined;
}) {
  const showError = useErrorSnackbar();

  const {
    isPending: matchesIsPending,
    data: matches = [],
    error: matchesError,
  } = useQuery({
    enabled: !!league,
    queryKey: ["matches", league, tournament],
    queryFn: () => getMatchesApi({ league, tournament }),
  });

  useEffect(() => {
    if (matchesError) {
      showError(`TippingTable_matchesError: ${matchesError.message}`);
    }
  }, [matchesError, showError]);

  if (matchesIsPending) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2" />
            {matches.map((match, index) => (
              <th key={index} className="border px-4 py-2">
                <TeamHeader teams={match.match.teams} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(tips).map(([userId, tipsOfUser]) => {
            return (
              <tr key={userId}>
                <td className="border px-4 py-2">
                  {userId === group.owner
                    ? group.ownerName
                    : group.members.find((member) => member.userId === userId)
                        ?.userName}
                </td>
                {matches.map((match, index) => (
                  <TipCell
                    key={index}
                    tips={tipsOfUser}
                    matchId={match.matchId}
                  />
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TippingTable;
