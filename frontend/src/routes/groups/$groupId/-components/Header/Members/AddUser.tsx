import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMemberToGroupApi } from "../../../../../../api/tippingGroupApi";
import { useErrorSnackbar } from "../../../../../../components/ErrorSnackbar";
import Modal from "../../../../../../components/Modal";
import { useState } from "react";

function AddUser({ groupId }: { groupId: string }) {
  const showError = useErrorSnackbar();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");

  const addMemberMutation = useMutation({
    mutationFn: () => {
      if (!username) {
        throw new Error("Username is required");
      }

      return addMemberToGroupApi(groupId, username);
    },
    onError: (error) => {
      showError(`AddUser_addMemberError: ${error.message}`);
    },
    onSuccess: () => {
      queryClient.fetchQuery({
        queryKey: ["group", groupId],
      });
      setShowModal(false);
      setUsername("");
    },
  });

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleConfirm = () => {
    addMemberMutation.mutate();
  };

  return (
    <>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        style={{ minWidth: "52px", minHeight: "20px" }}
        onClick={() => setShowModal(true)}
      >
        <img
          src="/add.svg"
          alt="Add user to group"
          className="filter invert h-5 w-5"
          style={{ minWidth: "20px", minHeight: "20px" }}
        />
      </button>

      <Modal
        showModal={showModal}
        onCancel={handleCloseModal}
        onConfirm={handleConfirm}
        title="Add User to Group"
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="New User's Name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </Modal>
    </>
  );
}

export default AddUser;
