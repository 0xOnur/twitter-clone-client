import { useMutation } from "@tanstack/react-query";
import { sendTweet } from "api/chatApi";
import useToast from "@hooks/useToast";
import { useState } from "react";

const useSendTweetViaMessage = () => {
    const { showToast } = useToast();

    const [isLoading, setLoading] = useState(false);

    const {mutate, isSuccess} = useMutation({
        mutationKey: ["sendTweetViaMessage"],
        mutationFn: sendTweet,
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: () => {
            setLoading(false);
            showToast("Direct Message sent.", "success")
        },
        onError: (err: any) => {
            setLoading(false);
            showToast(err?.message || "error", "error");
        }
    })

    return {mutate, isLoading, isSuccess};
}

export default useSendTweetViaMessage;