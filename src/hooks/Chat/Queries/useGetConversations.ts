import { useQuery } from "@tanstack/react-query";
import { getAllConversations } from "api/chatApi";

const useGetConversations = () => {
  const {data, refetch, status} = useQuery<IChat[]>({
    queryKey: ["chats"],
    queryFn: getAllConversations,
    refetchInterval: 10000,
  });

  return {chats: data, refetch, status};
};

export default useGetConversations;
