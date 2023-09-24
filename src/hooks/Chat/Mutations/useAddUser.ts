import useToast from "@hooks/useToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addUsersToGroup } from "api/chatApi";

const useAddUser = () => {
    const queryClient = useQueryClient()
    const {showToast} = useToast()
    
    const { mutate, isSuccess } = useMutation({
        mutationKey: ["addUser"],
        mutationFn: addUsersToGroup,
        onSuccess: (res:any) => {
            queryClient.invalidateQueries();
            showToast(res?.message || "xx", "success");
        },
        onError: (err: any) => {
            showToast(err?.message || "Something wrong..", "error");
        },
    });
    return { mutate, isSuccess };
}

export default useAddUser;