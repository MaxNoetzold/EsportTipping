import { useQuery } from "@tanstack/react-query";
import { getGroupsApi } from "../../../api/tippingGroupApi";
import { useEffect } from "react";
import { useErrorSnackbar } from "../../../components/ErrorSnackbar";
import Loading from "../../../components/Loading";
import CreateNewGroup from "./CreateNewGroup";
import { Link } from "@tanstack/react-router";

function GroupsOverview() {
  const showError = useErrorSnackbar();

  const {
    isPending,
    data: groups = [],
    error: groupsError,
  } = useQuery({
    queryKey: ["group", "all"],
    queryFn: () => getGroupsApi(),
  });

  useEffect(() => {
    if (groupsError?.message) showError(groupsError.message);
  }, [groupsError, showError]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Groups</h1>
      <CreateNewGroup />
      <div className="flex flex-col">
        {groups.map((group) => (
          <Link
            to="/groups/$groupId"
            params={{
              groupId: group._id,
            }}
            key={group._id}
            className="border p-4 mb-4 cursor-pointer"
          >
            <h2 className="text-xl font-bold">{group.name}</h2>
            <p>Owner: {group.ownerName}</p>
            <p>League: {group.league}</p>
            <p>
              Members:{" "}
              {group.members.reduce((names, member, index) => {
                return names + (index !== 0 ? ", " : "") + member.userName;
              }, "")}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GroupsOverview;
