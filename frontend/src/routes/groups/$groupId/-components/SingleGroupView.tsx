import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, getRouteApi } from "@tanstack/react-router";
import {
  addMemberToGroupApi,
  getGroupApi,
  removeMemberFromGroupApi,
  updateGroupApi,
} from "../../../../api/tippingGroupApi";
import Loading from "../../../../components/Loading";
import { useErrorSnackbar } from "../../../../components/ErrorSnackbar";
import getMeApi from "../../../../api/getMeApi";

const route = getRouteApi("/groups/$groupId/");

/*
  TODO:
  - Style
  - make multiple components out of this one (addMember, removeMember, changeName)
  - allow to delete group
*/
function SingleGroupView() {
  const { groupId } = route.useParams();
  const showError = useErrorSnackbar();
  const queryClient = useQueryClient();
  const [newName, setNewName] = useState("");

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

  const updateGroupMutation = useMutation({
    mutationFn: () => updateGroupApi(groupId, newName),
    onMutate: () => {
      if (!newName) {
        throw new Error("New name is required");
      }
    },
    onError: (error) => {
      showError(error.message);
    },
    onSuccess: () => {
      queryClient.fetchQuery({ queryKey: ["group", "all"] });
      queryClient.fetchQuery({ queryKey: ["group", groupId] });
    },
  });

  const addMemberMutation = useMutation({
    mutationFn: (username: string) => {
      if (!user) {
        throw new Error("User is required");
      }

      return addMemberToGroupApi(groupId, username);
    },
    onError: (error) => {
      showError(error.message);
    },
    onSuccess: () => {
      queryClient.fetchQuery({
        queryKey: ["group", groupId],
      });
    },
  });

  const removeMemberMutation = useMutation({
    mutationFn: (userId: string) => {
      if (!user) {
        throw new Error("User is required");
      }

      return removeMemberFromGroupApi(groupId, userId);
    },
    onError: (error) => {
      showError(error.message);
    },
    onSuccess: () => {
      queryClient.fetchQuery({
        queryKey: ["group", groupId],
      });
    },
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

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleNameSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateGroupMutation.mutate();
  };

  const handleAddUser = (username: string) => {
    addMemberMutation.mutate(username);
  };

  const handleRemoveUser = (userId: string) => {
    removeMemberMutation.mutate(userId);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{group.name}</h1>
      <p>League: {group.league}</p>
      <ul>
        {group.members.map((member) => (
          <li key={member.userId}>
            {member.userName}
            {isAdmin && (
              <button onClick={() => handleRemoveUser(member.userId)}>
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>
      {isAdmin && (
        <form onSubmit={handleNameSubmit}>
          <label>
            New Name:
            <input type="text" value={newName} onChange={handleNameChange} />
          </label>
          <button type="submit">Change Name</button>
          <button onClick={() => handleAddUser("TODO")}>Add User</button>
        </form>
      )}
    </div>
  );
}

export default SingleGroupView;
