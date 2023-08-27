import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSocketContext } from "contexts/SocketContext";
import { readMessage } from "api/chatApi";

interface IProps {
    message: IMessage
}

const useReadMessage = ({ message }: IProps) => {
    const queryClient = useQueryClient();
    const { socket } = useSocketContext();

    const { mutate } = useMutation({
        mutationKey: ["readMessage", message._id],
        mutationFn: readMessage,
        onSuccess: () => {
            const payload = {
                conversationId: message.chat,
                message: message,
            };
            socket?.emit("readMessage", payload);
            queryClient.invalidateQueries();
        }
    });

    return { mutate };
}

export default useReadMessage;