import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSocketContext } from "contexts/SocketContext";
import { sendMessage } from "api/chatApi";
import { useState } from "react";

interface IProps {
  message: IMessage;
}

const useSendMessage = ({ message }: IProps) => {
  const queryClient = useQueryClient();
  const { socket } = useSocketContext();

  const [isLoading, setLoading] = useState(false);

  const { mutate, isSuccess } = useMutation({
    mutationKey: ["sendMessage", message],
    mutationFn: sendMessage,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      const payload = {
        conversationId: message.chat,
        message: message,
      };
      socket?.emit("sendMessage", payload);
      queryClient.invalidateQueries();
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });

  return { mutate, isLoading, isSuccess };
};

export default useSendMessage;
