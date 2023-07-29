import { useQuery } from "@tanstack/react-query";
import { getAllChats } from "api/chatApi";

const useGetConversations = () => {
  const chats = useQuery<IChat[]>({
    queryKey: ["chats"],
    queryFn: getAllChats,
    refetchOnWindowFocus: false,
  });

  return chats;
};

export default useGetConversations;
