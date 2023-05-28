import { ITweet } from "@customTypes/TweetTypes";
import { useQuery } from "@tanstack/react-query";
import { getSpecificTweet } from "api/tweetApi";
import BasicCard from "./BasicCard";
import DetailedCard from "./DetailedCard";


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
  });

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
      return <DetailedCard isAuthenticated={isAuthenticated} tweet={tweet?.data!} />;
    default:
      return null;
  }
};

export default TweetCard;
