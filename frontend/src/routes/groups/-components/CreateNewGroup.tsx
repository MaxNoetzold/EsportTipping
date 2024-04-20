import { useRef, useState } from "react";
import { useErrorSnackbar } from "../../../components/ErrorSnackbar";
import useOnClickOutside from "../../../utils/useOnClickOutside";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGroupApi } from "../../../api/tippingGroupApi";
import Modal from "../../../components/Modal";

function CreateNewGroup() {
  const showError = useErrorSnackbar();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");

  const modalRef = useRef(null);
  useOnClickOutside(modalRef, () => setShowModal(false));

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const createGroup = useMutation({
    mutationFn: () => createGroupApi(groupName),
    onMutate: () => {
      if (!groupName) {
        throw new Error("Group name is required");
      }
    },
    onError: (error) => {
      showError(`CreateNewGroup_createGroupError: ${error.message}`);
    },
    onSuccess() {
      queryClient.fetchQuery({
        queryKey: ["group", "all"],
      });
      setShowModal(false);
    },
  });

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Create New Group
      </button>
      <Modal
        showModal={showModal}
        onCancel={handleCloseModal}
        onConfirm={() => createGroup.mutate()}
        title="Create New Group"
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

export default CreateNewGroup;
