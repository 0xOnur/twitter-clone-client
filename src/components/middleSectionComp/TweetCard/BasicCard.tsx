import { ITweet } from "@customTypes/TweetTypes";
import Tweet from "./TweetType/Tweet";
import Retweet from "./TweetType/Retweet";
import Quote from "./TweetType/Quote";
import Like from "./TweetType/Like";

interface IProps {
  isAuthenticated: boolean;
  tweet: ITweet;
  isReply?: boolean;
  hideActions?: boolean;
}

const BasicCard = ({
  isAuthenticated,
  tweet,
  isReply,
  hideActions,
}: IProps) => {
  switch (tweet?.tweetType) {
    case "tweet":
      return (
        <Tweet
          tweet={tweet}
          isReply={isReply}
          hideActions={hideActions}
          isAuthenticated={isAuthenticated}
        />
      );
      case "reply":
      return (
        <Tweet
          tweet={tweet}
          isReply={isReply}
          hideActions={hideActions}
          isAuthenticated={isAuthenticated}
        />
      );
    case "retweet":
      return (
        <Retweet
          tweet={tweet}
          isAuthenticated={isAuthenticated}
        />
      );
    case "like":
      return (
        <Like
          isAuthenticated={isAuthenticated}
          tweet={tweet}
        />
      );
    case "quote":
      return (
        <Quote
          tweet={tweet}
          isReply={isReply}
          isAuthenticated={isAuthenticated}
        />
      );
    default:
      return null;
  }
};

export default BasicCard;
