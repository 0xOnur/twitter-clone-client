import {useMutation, useQueryClient} from "@tanstack/react-query"
import { deleteConversation } from "api/chatApi"

interface IProps {
    chatId: string;
}

const useDeleteConversation = ({chatId}: IProps) => {
    const queryClient = useQueryClient()

    const deleteConversationMutation = useMutation({
        mutationKey: ["deleteConversation", chatId],
        mutationFn: deleteConversation,
        onSuccess: () => {
            queryClient.invalidateQueries(["chats"])
        }
    })

    return {deleteConversationMutation}
}

export default useDeleteConversation