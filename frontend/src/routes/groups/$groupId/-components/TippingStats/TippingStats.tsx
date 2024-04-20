import { DetailedTippingGroup } from "../../../../../types/TippingGroup";
import getMatchesApi from "../../../../../api/getMatchesApi";
import { useQuery } from "@tanstack/react-query";

function TippingStats({ group }: { group: DetailedTippingGroup }) {
  const { tips } = group;

  const {
    isPending: matchesIsPending,
    data: matches = [],
    error: matchesError,
  } = useQuery({
    queryKey: ["matches", group.league],
    queryFn: () => getMatchesApi({ league: group.league }),
  });

  if (matchesIsPending || matchesError) {
    return null;
  }

  const totalPlayedMatches = matches.filter(
    (match) => match.match.teams[0].result.outcome
  ).length;
  const userStats: {
    username: string;
    userId: string;
    totalTips: number;
    correctTips: number;
    percentage: number;
  }[] = [];

  for (const userId in tips) {
    const userTips = tips[userId];
    const totalTips = userTips.length;
    const correctTips = userTips.filter(
      (tip) => tip.winningTeamCode === tip.tippedTeamCode
    ).length;
    const percentage = (correctTips / totalPlayedMatches) * 100;
    const username =
      userId === group.owner
        ? group.ownerName
        : group.members.find((member) => member.userId === userId)?.userName;
    userStats.push({
      username: username || userId,
      userId,
      totalTips,
      correctTips,
      percentage,
    });
  }

  return (
    <div className="overflow-x-auto p-4">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Total Tips</th>
            <th className="px-4 py-2">Correct Tips</th>
            <th className="px-4 py-2">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {userStats.map((user) => (
            <tr key={user.userId}>
              <td className="border px-4 py-2">{user.username}</td>
              <td className="border px-4 py-2">{user.totalTips}</td>
              <td className="border px-4 py-2">{user.correctTips}</td>
              <td className="border px-4 py-2">
                {user.percentage.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TippingStats;
