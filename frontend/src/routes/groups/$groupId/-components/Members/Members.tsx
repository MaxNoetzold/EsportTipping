import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TippingGroup } from "../../../../../types/TippingGroup";
import { removeMemberFromGroupApi } from "../../../../../api/tippingGroupApi";
import { useErrorSnackbar } from "../../../../../components/ErrorSnackbar";
import AddUser from "./AddUser";

function GroupMembers({
  group,
  isAdmin,
}: {
  group: TippingGroup;
  isAdmin: boolean;
}) {
  const showError = useErrorSnackbar();
  const queryClient = useQueryClient();

  const removeMemberMutation = useMutation({
    mutationFn: (userId: string) => {
      if (!userId) {
        throw new Error("UserId is required");
      }

      return removeMemberFromGroupApi(group._id, userId);
    },
    onError: (error) => {
      showError(error.message);
    },
    onSuccess: () => {
      queryClient.fetchQuery({
        queryKey: ["group", group._id],
      });
    },
  });

  const handleRemoveUser = (userId: string) => {
    removeMemberMutation.mutate(userId);
  };

  return (
    <div className="flex items-center">
      <div className="mr-2">Members:</div>
      <div className="grid grid-cols-[auto,1fr] items-center gap-4">
        <div className="flex flex-grow overflow-x-auto space-x-4">
          {group.members.map((member) => (
            <div
              key={member.userId}
              className="flex p-1 border border-gray-300 rounded"
            >
              {member.userName}
              {isAdmin && (
                <button
                  onClick={() => handleRemoveUser(member.userId)}
                  className="ml-1"
                  style={{ minWidth: "20px", minHeight: "20px" }}
                >
                  <img
                    src="/remove.svg"
                    alt="Remove user"
                    className="filter invert h-5"
                  />
                </button>
              )}
            </div>
          ))}
        </div>
        {isAdmin && <AddUser groupId={group._id} />}
      </div>
    </div>
  );
}

export default GroupMembers;
