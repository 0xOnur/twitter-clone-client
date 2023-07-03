import { ReTweetedBy } from "@components/middleSectionComp/TweetCard/components";
import { ITweet } from "@customTypes/TweetTypes";
import TweetCard from "../TweetCard";

interface IProps {
  tweet: ITweet;
  isAuthenticated: boolean;
}

const Retweet = ({ tweet, isAuthenticated }: IProps) => {
  return (
    <article className="cursor-pointer hover:bg-gray-tweetHover duration-200">
      <div className="min-w-fit">
        <div className="flex flex-col pt-2">
          <ReTweetedBy reTweeterUser={tweet.author} />

          <TweetCard
            isAuthenticated={isAuthenticated}
            pageType="home"
            tweetId={tweet?.originalTweet!}
          />
        </div>
      </div>
    </article>
  );
};

export default Retweet;
