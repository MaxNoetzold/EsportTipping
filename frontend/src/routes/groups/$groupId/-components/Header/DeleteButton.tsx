import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useErrorSnackbar } from "../../../../../components/ErrorSnackbar";
import Modal from "../../../../../components/Modal";
import { deleteGroupApi } from "../../../../../api/tippingGroupApi";
import { useNavigate } from "@tanstack/react-router";

function GroupDeleteButton({ groupId }: { groupId: string }) {
  const [showModal, setShowModal] = useState(false);
  const showError = useErrorSnackbar();
  const queryClient = useQueryClient();
  const navigate = useNavigate({ from: "/groups/$groupId" });

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const deleteGroupMutation = useMutation({
    mutationFn: () => deleteGroupApi(groupId),
    onError: (error) => {
      showError(error.message);
    },
    onSuccess: () => {
      queryClient.fetchQuery({ queryKey: ["group", "all"] });
      navigate({ to: "/groups" });
    },
  });

  return (
    <>
      <button onClick={handleOpenModal} className="ml-2">
        <img
          src="/delete.svg"
          alt="Delete group"
          className="filter invert h-5"
        />
      </button>
      <Modal
        showModal={showModal}
        onCancel={handleCloseModal}
        onConfirm={() => deleteGroupMutation.mutate()}
        title="Delete Group"
      >
        <p className="text-black">
          Are you sure you want to delete this group?
        </p>
      </Modal>
    </>
  );
}

export default GroupDeleteButton;
