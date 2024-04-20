import { useQuery } from "@tanstack/react-query";
import getMeApi from "../../../../../api/getMeApi";
import { TippingGroup } from "../../../../../types/TippingGroup";
import { Navigate } from "@tanstack/react-router";
import { useErrorSnackbar } from "../../../../../components/ErrorSnackbar";
import { useEffect } from "react";
import GroupTitle from "./Title";
import GroupDeleteButton from "./DeleteButton";
import GroupMembers from "./Members";
import LeagueFilter from "../../../../../components/LeagueFilter";

type HeaderProps = {
  group: TippingGroup;
  league: string | undefined;
  setLeague: (league: string) => void;
  tournament: string | undefined;
  setTournament: (tournament: string | undefined) => void;
};

function Header({
  group,
  league,
  tournament,
  setLeague,
  setTournament,
}: HeaderProps) {
  const showError = useErrorSnackbar();

  const { data: user, error: userError } = useQuery({
    queryKey: ["user", "me"],
    queryFn: getMeApi,
  });

  // Display errors of querys
  useEffect(() => {
    if (userError?.message) {
      showError(`Header_userError: ${userError.message}`);
    }
  }, [userError, showError]);

  const isAdmin = user?.discordUserId === group.owner;

  if (userError) {
    return <Navigate to="/groups" from="/groups/$groupId" />;
  }

  return (
    <div className="p-4 border-b border-gray-300">
      <div style={{ display: "flex", alignItems: "center" }}>
        <GroupTitle group={group} isAdmin={isAdmin} />
        {isAdmin && <GroupDeleteButton groupId={group._id} />}
      </div>
      <LeagueFilter
        league={league}
        setLeague={setLeague}
        tournament={tournament}
        setTournament={setTournament}
        orientation="horizontal"
      />
      <GroupMembers group={group} isAdmin={isAdmin} />
    </div>
  );
}

export default Header;
