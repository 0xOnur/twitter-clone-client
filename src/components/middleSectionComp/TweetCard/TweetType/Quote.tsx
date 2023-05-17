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
} from "@components/middleSectionComp/TweetCard/components";
import TweetCard from "..";

type tweetStats = {
  replyCount: number;
  retweetCount: number;
  quoteCount: number;
};

interface IProps {
  tweet: ITweet;
  isAuthenticated: boolean;
}

const Quote = ({ tweet, isAuthenticated }: IProps) => {
  const navigate = useNavigate();

  const tweetStats = useQuery<tweetStats>({
    queryKey: ["tweetStats", tweet._id],
    queryFn: () => getSpecificTweetStats(tweet._id),
  });

  const navigateTweetDetails = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate(`/${tweet.author.username}/status/${tweet._id}`);
  };

  const navigateOriginalTweetDetails = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
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
          <div className="flex flex-row">
            <Avatar
              avatar={tweet.author.avatar!}
              username={tweet.author.username}
            />

            <div className="flex flex-col flex-grow pb-3">
              <AuthorInfo
                pageType="home"
                username={tweet.author.username}
                displayName={tweet.author.displayName}
                isVerified={tweet.author.isVerified}
                createdAt={tweet.createdAt}
              />
              {tweet.content && <TweetContent tweet={tweet} pageType="home" />}
              
              <div
                onClick={navigateOriginalTweetDetails}
                className="border-2 shadow-md rounded-3xl overflow-hidden"
              >
                <TweetCard
                  tweet={tweet.originalTweet!}
                  pageType="home"
                  hideActions={true}
                  isAuthenticated={isAuthenticated}
                />
              </div>

              {tweetStats && (
                <TweetActions
                  pageType={"home"}
                  tweet={tweet}
                  replyCount={tweetStats.data?.replyCount}
                  retweetCount={tweetStats.data?.retweetCount}
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

export default Quote;
