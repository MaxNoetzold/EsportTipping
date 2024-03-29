import { useQuery } from "@tanstack/react-query";
import { DetailedTippingGroup } from "../../../../../types/TippingGroup";
import getMatchesApi from "../../../../../api/getMatchesApi";
import Loading from "../../../../../components/Loading";
import { useErrorSnackbar } from "../../../../../components/ErrorSnackbar";
import { useEffect } from "react";
import TeamHeader from "./TeamHeader";
import TipCell from "./TipCell";

function TippingTable({ group }: { group: DetailedTippingGroup }) {
  const showError = useErrorSnackbar();

  const {
    isPending: matchesIsPending,
    data: matches = [],
    error: matchesError,
  } = useQuery({
    queryKey: ["matches", "spring"],
    queryFn: () => getMatchesApi("2024_spring"),
  });

  useEffect(() => {
    if (matchesError) {
      showError(matchesError.message);
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
          {Object.entries(group.tips).map(([userId, tips]) => {
            return (
              <tr key={userId}>
                <td className="border px-4 py-2">
                  {userId === group.owner
                    ? group.ownerName
                    : group.members.find((member) => member.userId === userId)
                        ?.userName}
                </td>
                {matches.map((match, index) => (
                  <TipCell key={index} tips={tips} matchId={match.matchId} />
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
