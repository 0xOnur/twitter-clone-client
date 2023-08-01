import {useMutation, useQueryClient} from "@tanstack/react-query"
import { createConversation } from "api/chatApi";
import { useNavigate } from "react-router-dom";

interface IProps {
    users: IUser[]
}

const useCreateConversation = ({users}: IProps) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const createConversationMutation = useMutation({
        mutationKey: ["createConversation", users],
        mutationFn: createConversation,
        onSuccess: (data: IChat) => {
            queryClient.invalidateQueries(["chats"])
            navigate(`/messages/${data._id}`)
        }
    })
    return {createConversationMutation}
};

export default useCreateConversation