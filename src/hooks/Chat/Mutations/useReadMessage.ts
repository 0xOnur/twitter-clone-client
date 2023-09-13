import { useMutation } from "@tanstack/react-query";
import { readMessage } from "api/chatApi";

interface IProps {
    message: IMessage
}

const useReadMessage = ({ message }: IProps) => {

    const { mutate } = useMutation({
        mutationKey: ["readMessage", message._id],
        mutationFn: readMessage,
    });

    return { mutate };
}

export default useReadMessage;