import { useQuery } from "@tanstack/react-query";
import getMeApi from "../../../../../api/getMeApi";
import { DetailedTippingGroup } from "../../../../../types/TippingGroup";
import { Navigate } from "@tanstack/react-router";
import { useErrorSnackbar } from "../../../../../components/ErrorSnackbar";
import { useEffect } from "react";
import GroupTitle from "./Title";
import GroupDeleteButton from "./DeleteButton";
import GroupMembers from "./Members";

function Header({ group }: { group: DetailedTippingGroup }) {
  const showError = useErrorSnackbar();

  const { data: user, error: userError } = useQuery({
    queryKey: ["user", "me"],
    queryFn: getMeApi,
  });

  // Display errors of querys
  useEffect(() => {
    if (userError?.message) {
      showError(userError.message);
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
      <p>League: {group.league}</p>
      <GroupMembers group={group} isAdmin={isAdmin} />
    </div>
  );
}

export default Header;
