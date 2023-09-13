import {useMutation, useQueryClient} from "@tanstack/react-query"
import { createConversation } from "api/chatApi";
import { useNavigate } from "react-router-dom";

const useCreateConversation = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const {mutate, isSuccess} = useMutation({
        mutationKey: ["createConversation"],
        mutationFn: createConversation,
        onSuccess: (data: IChat) => {
            queryClient.invalidateQueries(["chats"])
            navigate(`/messages/${data._id}`)
        }
    })
    return {mutate, isSuccess}
};

export default useCreateConversation