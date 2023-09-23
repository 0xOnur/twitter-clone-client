import { useQueryClient, useMutation } from "@tanstack/react-query";
import { editGroup } from "api/chatApi";
import useToast from "@hooks/useToast";
import { useState } from "react";

const useEditGroup = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const [isLoading, setLoading] = useState(false);

  const { mutate, isSuccess } = useMutation({
    mutationKey: ["editGroup"],
    mutationFn: editGroup,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      queryClient.invalidateQueries();
      showToast("Group edited.", "success");
    },
    onError: (err: any) => {
      setLoading(false);
      showToast(err?.message || "error", "error");
    },
  });

  return { mutate, isLoading, isSuccess };
};

export default useEditGroup;
