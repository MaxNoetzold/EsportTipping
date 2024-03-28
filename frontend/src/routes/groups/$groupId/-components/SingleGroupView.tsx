import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate, getRouteApi } from "@tanstack/react-router";
import { getGroupApi } from "../../../../api/tippingGroupApi";
import Loading from "../../../../components/Loading";
import { useErrorSnackbar } from "../../../../components/ErrorSnackbar";
import getMeApi from "../../../../api/getMeApi";
import GroupTitle from "./Title";
import GroupMembers from "./Members";
import GroupDeleteButton from "./DeleteButton";

const route = getRouteApi("/groups/$groupId/");

/*
  TODO:
  - Style
  - allow to delete group
*/
function SingleGroupView() {
  const { groupId } = route.useParams();
  const showError = useErrorSnackbar();

  const {
    isPending,
    data: group,
    error: groupError,
  } = useQuery({
    queryKey: ["group", groupId],
    queryFn: () => getGroupApi(groupId),
  });
  const { data: user, error: userError } = useQuery({
    queryKey: ["user", "me"],
    queryFn: getMeApi,
  });

  // Display errors of querys
  useEffect(() => {
    if (groupError?.message) {
      showError(groupError.message);
    }
    if (userError?.message) {
      showError(userError.message);
    }
  }, [groupError, userError, showError]);

  if (isPending) {
    return <Loading />;
  }

  if (groupError || userError) {
    return <Navigate to="/groups" from="/groups/$groupId" />;
  }

  const isAdmin = user?.discordUserId === group.owner;

  return (
    <div className="p-4">
      <div style={{ display: "flex", alignItems: "center" }}>
        <GroupTitle group={group} isAdmin={isAdmin} />
        {isAdmin && <GroupDeleteButton groupId={group._id} />}
      </div>
      <p>League: {group.league}</p>
      <GroupMembers group={group} isAdmin={isAdmin} />
    </div>
  );
}

export default SingleGroupView;
