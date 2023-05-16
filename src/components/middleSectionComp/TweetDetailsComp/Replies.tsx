import { useQuery } from "@tanstack/react-query";
import { getTweetReplies } from "api/tweetApi";
import { LoadingIcon } from "@icons/Icon";
import TweetCard from "@components/middleSectionComp/TweetCard";
import { useSelector } from "react-redux";
import { RootState } from "@redux/config/store";

interface IProps {
  tweetId: string;
}

const Replies = ({ tweetId }: IProps) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const tweetRepliesQuery = useQuery<[]>({
    queryKey: ["tweetReplies", tweetId],
    queryFn: () => getTweetReplies(tweetId!),
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
      <div className="flex justify-center items-center h-56">
        <span className="text-2xl font-bold text-gray-500">
          Something went wrong while loading replies
        </span>
      </div>
    );
  }

  if (tweetRepliesQuery.data) {
    return (
      <div>
        {tweetRepliesQuery.data.map((tweet, index) => {
          return (
            <TweetCard
              key={index}
              tweet={tweet}
              isAuthenticated={isAuthenticated}
              pageType="home"
            />
          );
        })}
      </div>
    );
  }

  return null;
};

export default Replies;
