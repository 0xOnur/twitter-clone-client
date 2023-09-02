import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMessage } from "api/chatApi";
import useToast from "@hooks/useToast";

const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate } = useMutation({
    mutationKey: ["deleteMessage"],
    mutationFn: deleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
    onError: () => {
      showToast("Error deleting message", "error");
    },
  });

  return { mutate };
};

export default useDeleteMessage;
