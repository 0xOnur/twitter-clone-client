import { LikedBy } from "@components/middleSectionComp/TweetCard/components";
import { ITweet } from "@customTypes/TweetTypes";
import TweetCard from "../TweetCard";

interface IProps {
  tweet: ITweet;
  isAuthenticated: boolean;
}

const Like = ({ tweet, isAuthenticated }: IProps) => {
  return (
    <article className="cursor-pointer hover:bg-gray-tweetHover duration-200">
      <div className="min-w-fit">
        <div className="flex flex-col pt-2">
          <LikedBy likedUser={tweet.author} />

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

export default Like;