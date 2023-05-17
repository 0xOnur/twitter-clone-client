import React from "react";
import { useNavigate } from "react-router-dom";
import { ITweet } from "@customTypes/TweetTypes";
import { useQuery } from "@tanstack/react-query";
import { getSpecificTweetStats } from "api/tweetApi";
import {
  AuthorInfo,
  Avatar,
  TweetContent,
  TweetActions,
  ReTweetedBy,
} from "@components/middleSectionComp/TweetCard/components";

type tweetStats = {
  replyCount: number;
  retweetCount: number;
  quoteCount: number;
};

interface IProps {
  tweet: ITweet;
  isAuthenticated: boolean;
}
const Retweet = ({
  tweet,
  isAuthenticated,
}: IProps) => {
  const navigate = useNavigate();

  const originalTweetStats = useQuery<tweetStats>({
    queryKey: ["tweetStats", tweet.originalTweet?._id],
    queryFn: () => getSpecificTweetStats(tweet.originalTweet?._id!),
  });

  const navigateTweetDetails = () => {
    navigate(
      `/${tweet.originalTweet?.author.username}/status/${tweet.originalTweet?._id}`
    );
  };

  return (
    <article
      onClick={navigateTweetDetails}
      className="cursor-pointer  hover:bg-gray-tweetHover duration-200"
    >
      <div className="px-4 min-w-fit">
        <div className="flex flex-col pt-2">
          <ReTweetedBy reTweeterUser={tweet.author} />

          <div className="flex flex-row">
            <Avatar
              avatar={tweet.originalTweet?.author.avatar!}
              username={tweet.originalTweet?.author.username!}
            />

            <div className="flex flex-col flex-grow pb-3">
              <AuthorInfo
                pageType="home"
                username={tweet.originalTweet?.author.username!}
                displayName={tweet.originalTweet?.author.displayName!}
                isVerified={tweet.originalTweet?.author.isVerified!}
                createdAt={tweet.createdAt}
              />
              {tweet.originalTweet?.content && (
                <TweetContent tweet={tweet.originalTweet} pageType="home" />
              )}

              {originalTweetStats && (
                <TweetActions
                  pageType={"home"}
                  tweet={tweet.originalTweet!}
                  replyCount={originalTweetStats.data?.replyCount}
                  retweetCount={originalTweetStats.data?.retweetCount}
                  isAuthenticated={isAuthenticated}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Retweet;
