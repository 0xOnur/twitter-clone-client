import { useQueryClient, useMutation } from "@tanstack/react-query";
import { editGroup } from "api/chatApi";
import useToast from "@hooks/useToast";

const useEditGroup = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();


  const { mutate, isSuccess, isLoading } = useMutation({
    mutationKey: ["editGroup"],
    mutationFn: editGroup,
    onSuccess: () => {
      queryClient.invalidateQueries();
      showToast("Group edited.", "success");
    },
    onError: (err: any) => {
      showToast(err?.message || "error", "error");
    },
  });

  return { mutate, isLoading, isSuccess };
};

export default useEditGroup;
