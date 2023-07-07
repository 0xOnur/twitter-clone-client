import { LikedBy } from "@components/middleSectionComp/TweetCard/components";
import { ITweet } from "@customTypes/TweetTypes";
import { RootState } from "@redux/config/store";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TweetCard from "../TweetCard";
import React from "react"

interface IProps {
  tweet: ITweet;
  isAuthenticated: boolean;
}

const Like = ({ tweet, isAuthenticated }: IProps) => {
  const reduxUser = useSelector((state: RootState) => state.user);
  const {tab} = useParams()

  // Remove user liked tweets from homepage.
  if(tweet.author._id === reduxUser.user._id && tab !== "likes") {
    return null;
  }
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

export default React.memo(Like);