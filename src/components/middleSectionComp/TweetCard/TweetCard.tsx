import { ITweet } from "@customTypes/TweetTypes";
import { useQuery } from "@tanstack/react-query";
import { getSpecificTweet } from "api/tweetApi";
import BasicCard from "./BasicCard";
import DetailedCard from "./DetailedCard";
import { LoadingIcon } from "@icons/Icon";
import NotFoundTweet from "./NotFoundTweet";

interface IProps {
  pageType: "home" | "TweetDetails";
  tweetId: string;
  isReply?: boolean;
  hideActions?: boolean;
  isAuthenticated: boolean;
}

const TweetCard = ({
  pageType,
  tweetId,
  isAuthenticated,
  isReply,
  hideActions,
}: IProps) => {
  const tweet = useQuery<ITweet>({
    queryKey: ["tweet", tweetId],
    queryFn: () => getSpecificTweet(tweetId),
    refetchOnWindowFocus: false,
  });

  if (tweet.isLoading) {
    return (
      <div className="flex flex-col items-center rounded-2xl p-5 m-3">
        <LoadingIcon />
      </div>
    );
  }

  if (tweet.data) {
    switch (pageType) {
      case "home":
        return (
          <BasicCard
            isAuthenticated={isAuthenticated}
            tweet={tweet?.data!}
            isReply={isReply}
            hideActions={hideActions}
          />
        );
      case "TweetDetails":
        return (
          <DetailedCard
            isAuthenticated={isAuthenticated}
            tweet={tweet?.data!}
          />
        );
      default:
        return null;
    }
  } else {
    return (
      <NotFoundTweet />
    );
  }
};

export default TweetCard;
