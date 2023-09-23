import useToast from "@hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { retweetTweet } from "api/tweetApi";

const useRetweetMutation = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const { mutate: retweetMutate } = useMutation({
    mutationKey: ["retweetTweet"],
    mutationFn: retweetTweet,
    onError: (err: any) => {
      showToast(err?.message || "error", "error");
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries();
      showToast(res?.message || "Tweet unretweeted", "success");
    },
  });

    return { retweetMutate };
};

export default useRetweetMutation;
