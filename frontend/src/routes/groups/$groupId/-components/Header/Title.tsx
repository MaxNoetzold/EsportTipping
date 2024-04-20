import { useState } from "react";
import { TippingGroup } from "../../../../../types/TippingGroup";
import Modal from "../../../../../components/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroupApi } from "../../../../../api/tippingGroupApi";
import { useErrorSnackbar } from "../../../../../components/ErrorSnackbar";

function GroupTitle({
  group,
  isAdmin,
}: {
  group: TippingGroup;
  isAdmin: boolean;
}) {
  const showError = useErrorSnackbar();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState(group.name);

  const updateGroupMutation = useMutation({
    mutationFn: () => updateGroupApi(group._id, groupName),
    onMutate: () => {
      if (!groupName) {
        throw new Error("New name is required");
      }
    },
    onError: (error) => {
      showError(`GroupTitle_updateGroupError: ${error.message}`);
    },
    onSuccess: () => {
      queryClient.fetchQuery({ queryKey: ["group", "all"] });
      queryClient.fetchQuery({ queryKey: ["group", group._id] });
    },
  });

  const handleOpenModal = () => {
    setGroupName(group.name);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    updateGroupMutation.mutate();
    setShowModal(false);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-2 flex items-center">
        {group.name}
        {isAdmin && (
          <button onClick={handleOpenModal} className="ml-2">
            <img
              src="/edit.svg"
              alt="Edit title"
              className="filter invert h-5"
            />
          </button>
        )}
      </h1>
      <Modal
        showModal={showModal}
        onCancel={handleCloseModal}
        onConfirm={handleConfirm}
        title="Edit Group Name"
      >
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeholder="Group Name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </Modal>
    </>
  );
}

export default GroupTitle;
