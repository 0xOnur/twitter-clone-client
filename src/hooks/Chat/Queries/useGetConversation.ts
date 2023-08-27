import { useQuery } from "@tanstack/react-query";
import { getConversation } from "api/chatApi";

interface IProps {
    chatId: string;
}

const useGetConversation = ({chatId}: IProps) => {
  const chat = useQuery<IChat>({
    queryKey: ["chat", chatId],
    queryFn: () => getConversation(chatId),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    retry: true,
  });

  return chat;
};

export default useGetConversation;
