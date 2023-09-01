import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSocketContext } from "contexts/SocketContext";
import { sendMessage } from "api/chatApi";
import { useState } from "react";

const useSendMessage = () => {
  const queryClient = useQueryClient();
  const { socket } = useSocketContext();

  const [isLoading, setLoading] = useState(false);

  const { mutate } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: sendMessage,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data: IMessage) => {
      const payload = {
        conversationId: data.chat,
        message: data,
      };
      socket?.emit("sendMessage", payload);
      queryClient.invalidateQueries();
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });

  return { mutate, isLoading };
};

export default useSendMessage;
