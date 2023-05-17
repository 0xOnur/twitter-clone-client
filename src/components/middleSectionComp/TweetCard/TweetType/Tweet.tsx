import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSpecificTweetStats } from "api/tweetApi";
import { ITweet } from "@customTypes/TweetTypes";
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
  hideActions?: boolean;
  isReply?: boolean;
  isAuthenticated: boolean;
}

const Tweet = ({ tweet, hideActions, isReply, isAuthenticated }: IProps) => {
  const navigate = useNavigate();

  const navigateTweetDetails = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate(`/${tweet.author.username}/status/${tweet._id}`);
  };

  const tweetStats = useQuery<tweetStats>({
    queryKey: ["tweetStats", tweet._id],
    queryFn: () => getSpecificTweetStats(tweet._id),
  });

  return (
    <div>
      {tweet.originalTweet && (
        <TweetCard
          tweet={tweet.originalTweet}
          pageType="home"
          isReply={true}
          hideActions={false}
          isAuthenticated={isAuthenticated}
        />
      )}
      <article
        onClick={navigateTweetDetails}
        className="cursor-pointer hover:bg-gray-tweetHover duration-200"
      >
        <div className="px-4 min-w-fit">
          <div className="flex flex-col pt-2">
            <div className="flex flex-row">
              {isReply ? (
                <div className="flex flex-col justify-center items-center">
                  <Avatar
                    avatar={tweet.author.avatar!}
                    username={tweet.author.username}
                  />
                  <div className="w-px -ml-3 bg-gray-200 mt-1 h-full" />
                </div>
              ) : (
                <Avatar
                  avatar={tweet.author.avatar!}
                  username={tweet.author.username}
                />
              )}

              <div className="flex flex-col flex-grow pb-3">
                <AuthorInfo
                  pageType="home"
                  username={tweet.author.username}
                  displayName={tweet.author.displayName}
                  isVerified={tweet.author.isVerified}
                  createdAt={tweet.createdAt}
                />
                {tweet.content && (
                  <TweetContent tweet={tweet} pageType="home" />
                )}

                {!hideActions && (
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
    </div>
  );
};

export default Tweet;
