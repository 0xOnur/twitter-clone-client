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
    refetch,
    hasNextPage,
    isRefetching,
    fetchNextPage,
    isInitialLoading,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["chatMessages", conversationId],
    fetchMessages,
    {
      refetchOnWindowFocus: false,
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
    refetch,
    hasNextPage,
    isRefetching,
    fetchNextPage,
    isInitialLoading,
    isFetchingNextPage,
  };
};

export default useGetMessages;
