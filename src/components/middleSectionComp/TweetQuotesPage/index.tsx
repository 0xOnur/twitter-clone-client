import { useParams } from "react-router-dom";
import { HeaderComp } from "..";
import QuoteTweets from "./QuoteTweets";

interface IProps {
  isAuthenticated:boolean;
}

const TweetQuotes = ({isAuthenticated}: IProps) => {
  const { tweetId } = useParams<{ tweetId: string }>();
  return (
    <div className="container max-w-600px w-full border-x-2 border-[color:var(--background-third)]">
      <HeaderComp.Header pageType="Profile" headerTitle="Quote Tweets" />
      <QuoteTweets isAuthenticated={isAuthenticated} tweetId={tweetId!} />
    </div>
  );
};

export default TweetQuotes;
