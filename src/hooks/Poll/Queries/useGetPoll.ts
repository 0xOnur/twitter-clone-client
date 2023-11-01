import { useQuery } from "@tanstack/react-query";
import { getPoll } from "api/tweetApi";

const useGetPoll = (pollId: string) => {
  const { data, status, refetch } = useQuery<IPoll>({
    queryKey: ["poll", pollId],
    queryFn: () => getPoll(pollId),
    refetchOnWindowFocus: false,
  });

  return { poll: data, status, refetch };
};

export default useGetPoll;
