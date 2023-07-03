import { useParams } from "react-router-dom";
import { HeaderComp } from "..";
import QuoteTweets from "./QuoteTweets";

const TweetQuotes = () => {
  const { tweetId } = useParams<{ tweetId: string }>();
  return (
    <div className="container max-w-600px w-full border-x">
      <HeaderComp.Header pageType="Profile" headerTitle="Quote Tweets" />
      <QuoteTweets tweetId={tweetId!} />
    </div>
  );
};

export default TweetQuotes;
