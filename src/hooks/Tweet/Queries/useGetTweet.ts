import { useQuery } from "@tanstack/react-query";
import { getSpecificTweet } from "api/tweetApi";

interface IProps {
    tweetId: string;
}

const useGetTweet = ({tweetId}: IProps) => {
    const {data, status, refetch} = useQuery<ITweet>({
        queryKey: ["tweet", tweetId],
        queryFn: () => getSpecificTweet(tweetId),
        refetchOnWindowFocus: false,
    });
    
    return {tweet: data, status, refetch};
}

export default useGetTweet;
