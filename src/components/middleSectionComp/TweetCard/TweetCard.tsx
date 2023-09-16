import NotFoundTweet from "./NotFoundTweet";
import DetailedCard from "./DetailedCard";
import { LoadingIcon } from "@icons/Icon";
import BasicCard from "./BasicCard";
import useGetTweet from "@hooks/Tweet/Queries/useGetTweet";

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

  const {tweet, status} = useGetTweet({tweetId: tweetId});

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center rounded-2xl p-5 m-3">
        <LoadingIcon />
      </div>
    );
  }

  if(tweet) {
    switch (pageType) {
      case "home":
        return (
          <BasicCard
            isAuthenticated={isAuthenticated}
            tweet={tweet}
            isReply={isReply}
            hideActions={hideActions}
          />
        );
      case "TweetDetails":
        return (
          <DetailedCard
            isAuthenticated={isAuthenticated}
            tweet={tweet}
          />
        );
      default:
        return null;
    }
  }

  if(status === "error") {
    return (
      <NotFoundTweet />
    );
  }
};

export default TweetCard;
