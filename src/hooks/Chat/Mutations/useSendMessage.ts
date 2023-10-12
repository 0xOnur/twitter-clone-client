import useToast from "@hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "api/chatApi";

const useSendMessage = () => {
  const { showToast } = useToast();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: sendMessage,
    onError: (err: any) => {
      showToast(err?.message || "error", "error");
    },
  });

  return { mutate, isLoading };
};

export default useSendMessage;
