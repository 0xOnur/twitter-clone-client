import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTweet } from "api/tweetApi";
import useToast from "@hooks/useToast";
import { clearComposer, setIsLoading } from "@redux/slices/composerSlice";
import { useDispatch } from "react-redux";

export const useCreateTweetMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const { mutate, isLoading } = useMutation({
    mutationFn: createTweet,
    onMutate: () => {
      dispatch(setIsLoading(true));
    },
    onSuccess: (res) => {
      dispatch(clearComposer());
      queryClient.invalidateQueries();
      showToast(res?.message || "Tweet created succesfully", "success");
    },
    onError: (err: any) => {
      showToast(err?.message || "Something went wrong", "error");
    },
  });

  return {mutate, isLoading}
};

export default useCreateTweetMutation;
