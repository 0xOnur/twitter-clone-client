import { useQuery } from "@tanstack/react-query";
import { getAllConversations } from "api/chatApi";

const useGetConversations = () => {
  const chats = useQuery<IChat[]>({
    queryKey: ["chats"],
    queryFn: getAllConversations,
    refetchInterval: 10000,
  });

  return chats;
};

export default useGetConversations;
