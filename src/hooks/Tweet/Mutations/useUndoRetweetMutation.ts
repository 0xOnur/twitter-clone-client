import useToast from "@hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { undoRetweet } from "api/tweetApi";

const useUndoRetweetMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate: undoRetweetMutate } = useMutation({
    mutationKey: ["undoRetweet"],
    mutationFn: undoRetweet,
    onError: (err: any) => {
      showToast(err?.message || "error", "error");
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries();
      showToast(res?.message || "Tweet unretweeted", "success");
    },
  });

    return { undoRetweetMutate };
};

export default useUndoRetweetMutation;
