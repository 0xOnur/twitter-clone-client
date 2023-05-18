import { ITweet } from "@customTypes/TweetTypes";
import BasicCard from "./BasicCard";
import DetailedCard from "./DetailedCard";

interface IProps {
  pageType: "home" | "TweetDetails";
  tweet: ITweet;
  isReply?: boolean;
  hideActions?: boolean;
  isAuthenticated: boolean;
}

const TweetCard = ({
  pageType,
  tweet,
  isAuthenticated,
  isReply,
  hideActions,
}: IProps) => {
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
      return <DetailedCard isAuthenticated={isAuthenticated} tweet={tweet} />;
    default:
      return null;
  }
};

export default TweetCard;
