import useToast from "@hooks/useToast";
import { useMutation } from "@tanstack/react-query";
import { sendMessage } from "api/chatApi";
import { useState } from "react";

const useSendMessage = () => {
  const { showToast } = useToast();
  const [isLoading, setLoading] = useState(false);

  const { mutate } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: sendMessage,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
    },
    onError: (err: any) => {
      setLoading(false);
      showToast(err?.message || "error", "error");
    },
  });

  return { mutate, isLoading };
};

export default useSendMessage;
