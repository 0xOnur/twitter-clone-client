import {useMutation, useQueryClient} from "@tanstack/react-query"
import { deleteConversation } from "api/chatApi"
import { useNavigate } from "react-router-dom"

const useDeleteConversation = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const {mutate} = useMutation({
        mutationKey: ["deleteConversation"],
        mutationFn: deleteConversation,
        onSuccess: () => {
            queryClient.invalidateQueries(["chats"])
            navigate("/messages")
        }
    })

    return {mutate}
}

export default useDeleteConversation