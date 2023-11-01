import { ReTweetedBy } from "@components/middleSectionComp/TweetCard/components";
import { TweetCard } from "@components/middleSectionComp/TweetCard";

interface IProps {
  tweet: ITweet;
  isAuthenticated: boolean;
}

const Retweet = ({ tweet, isAuthenticated }: IProps) => {
  return (
    <article className="group/tweet">
        <div className="flex flex-col">
          <ReTweetedBy reTweeterUser={tweet.author} />

          <TweetCard
            isAuthenticated={isAuthenticated}
            pageType="home"
            tweetId={tweet?.originalTweet!}
          />
        </div>
    </article>
  );
};

export default Retweet;
