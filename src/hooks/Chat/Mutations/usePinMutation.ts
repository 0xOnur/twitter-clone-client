import { useMutation, useQueryClient } from "@tanstack/react-query";
import { pinConversation, unpinConversation } from "api/chatApi";

interface IProps {
    chatId: string
}

const usePinMutation = ({chatId}: IProps ) => {
    const queryClient = useQueryClient()

    const setPin = useMutation({
        mutationKey: ["pinConversation", chatId],
        mutationFn: pinConversation,
        onSuccess: () => {
            queryClient.invalidateQueries(["chats"])
        }
    })

    const unsetPin = useMutation({
        mutationKey: ["unpinConversation", chatId],
        mutationFn: unpinConversation,
        onSuccess: () => {
            queryClient.invalidateQueries(["chats"])
        }
    })

    return {setPin, unsetPin}
}

export default usePinMutation