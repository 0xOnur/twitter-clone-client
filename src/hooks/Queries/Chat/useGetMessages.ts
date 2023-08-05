import { useInfiniteQuery } from "@tanstack/react-query";
import { getConversationMessages } from "api/chatApi";

interface IProps {
  conversationId: string;
}

const useGetMessages = ({ conversationId }: IProps) => {
  const fetchMessages = ({ pageParam = 0 }) => {
    return getConversationMessages(conversationId, pageParam, 20);
  };

  const {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery(
    ["conversationMessages", conversationId],
    fetchMessages,
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.totalPages) {
          return lastPage.page + 1;
        }
        return false;
      },
    }
  );

  return {
    data,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  };
};

export default useGetMessages;
