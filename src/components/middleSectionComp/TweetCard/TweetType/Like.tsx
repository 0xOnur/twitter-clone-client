import { LikedBy } from "@components/middleSectionComp/TweetCard/components";
import TweetCard from "../TweetCard";
import React from "react"

interface IProps {
  tweet: ITweet;
  isAuthenticated: boolean;
}

const Like = ({ tweet, isAuthenticated }: IProps) => {

  return (
    <article className="group/tweet">
        <div className="flex flex-col">
          <LikedBy likedUser={tweet.author} />

          <TweetCard
            isAuthenticated={isAuthenticated}
            pageType="home"
            tweetId={tweet?.originalTweet!}
          />
        </div>
    </article>
  );
};

export default React.memo(Like);