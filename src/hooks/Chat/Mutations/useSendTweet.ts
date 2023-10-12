import { useMutation } from "@tanstack/react-query";
import { sendTweet } from "api/chatApi";
import useToast from "@hooks/useToast";

const useSendTweetViaMessage = () => {
    const { showToast } = useToast();

    const {mutate, isSuccess, isLoading} = useMutation({
        mutationKey: ["sendTweetViaMessage"],
        mutationFn: sendTweet,
        onSuccess: () => {
            showToast("Direct Message sent.", "success")
        },
        onError: (err: any) => {
            showToast(err?.message || "error", "error");
        }
    })

    return {mutate, isLoading, isSuccess};
}

export default useSendTweetViaMessage;