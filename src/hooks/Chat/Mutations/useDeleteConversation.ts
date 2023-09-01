import {useMutation, useQueryClient} from "@tanstack/react-query"
import { deleteConversation } from "api/chatApi"

const useDeleteConversation = () => {
    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationKey: ["deleteConversation"],
        mutationFn: deleteConversation,
        onSuccess: () => {
            queryClient.invalidateQueries(["chats"])
        }
    })

    return {mutate}
}

export default useDeleteConversation