import { useQuery } from "@tanstack/react-query";
import { getGroupsApi } from "../../../api/tippingGroupApi";
import { useEffect } from "react";
import { useErrorSnackbar } from "../../../components/ErrorSnackbar";
import Loading from "../../../components/Loading";
import CreateNewGroup from "./CreateNewGroup";

function GroupsOverview() {
  const showError = useErrorSnackbar();

  const {
    isPending,
    data: groups = [],
    error: groupsError,
  } = useQuery({
    queryKey: ["groups"],
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
      {groups.map((group) => (
        <div key={group._id} className="border p-4 mb-4 cursor-pointer">
          <h2 className="text-xl font-bold">{group.name}</h2>
          <p>Owner: {group.owner}</p>
          <p>League: {group.league}</p>
          <p>Members:</p>
          <ul>
            {group.members.map((member) => (
              <li key={member.userId}>
                {member.userId} - {member.role}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default GroupsOverview;
