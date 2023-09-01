import { useQuery } from "@tanstack/react-query";
import { getConversation } from "api/chatApi";

interface IProps {
    chatId: string;
}

const useGetConversation = ({chatId}: IProps) => {
  const {data, status, refetch} = useQuery<IChat>({
    queryKey: ["chat", chatId],
    queryFn: () => getConversation(chatId),
    refetchOnWindowFocus: false,
  });

  return {data, status, refetch};
};

export default useGetConversation;
