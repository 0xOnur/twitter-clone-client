import { useQuery } from "@tanstack/react-query";
import { getTweetReplies } from "api/tweetApi";
import { LoadingIcon, RetryIcon } from "@icons/Icon";
import TweetCard from "@components/middleSectionComp/TweetCard";
import { useSelector } from "react-redux";
import { RootState } from "@redux/config/store";
import { ITweet } from "@customTypes/TweetTypes";

interface IProps {
  tweetId: string;
}

const Replies = ({ tweetId }: IProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const tweetRepliesQuery = useQuery<ITweet[]>({
    queryKey: ["tweetReplies", tweetId],
    queryFn: () => getTweetReplies(tweetId!),
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (tweetRepliesQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-56">
        <LoadingIcon />
      </div>
    );
  }

  if (tweetRepliesQuery.isError) {
    return (
      <div className="flex flex-col max-w-600px w-full justify-center items-center py-5 px-3">
        <span className="mb-5 text-center">
          Something went wrong. Try reloading.
        </span>
        <button
          onClick={() => tweetRepliesQuery.refetch()}
          className="flex gap-1 items-center px-4 py-2 min-h-[36px] bg-primary-base hover:bg-primary-dark duration-200 rounded-full"
        >
          <RetryIcon className="w-6 h-6 text-white" />
          <span className="font-bold text-white">Retry</span>
        </button>
      </div>
    );
  }

  if (tweetRepliesQuery.data) {
    return (
      <div>
        {tweetRepliesQuery.data.map((tweet, index) => {
          return (
            <div key={index} className="border-b">
              <TweetCard
                key={index}
                tweetId={tweet._id}
                pageType="home"
                isAuthenticated={isAuthenticated}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return null;
};

export default Replies;
