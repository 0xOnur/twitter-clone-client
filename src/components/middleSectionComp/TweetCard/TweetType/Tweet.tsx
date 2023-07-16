import Poll from "@components/middleSectionComp/TweetCard/components/Poll";
import { TweetCard } from "@components/middleSectionComp/TweetCard";
import {
  AuthorInfo,
  Avatar,
  TweetContent,
  TweetActions,
  TweetMedia,
} from "@components/middleSectionComp/TweetCard/components";
import { getSpecificTweetAuthor } from "api/tweetApi";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import React from "react";

interface IProps {
  isAuthenticated: boolean;
  tweet: ITweet;
  hideActions?: boolean;
  isReply?: boolean;
}

const Tweet = ({ tweet, hideActions, isReply, isAuthenticated }: IProps) => {
  const navigate = useNavigate();

  const navigateTweetDetails = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    navigate(`/${tweet.author.username}/status/${tweet._id}`);
  };

  const originalTweetAuthor = useQuery({
    queryKey: ["originalTweetAuthor", tweet?.originalTweet],
    queryFn: () => getSpecificTweetAuthor(tweet?.originalTweet!),
    refetchOnWindowFocus: false,
    enabled: false,
    retry: false,
  });

  if (tweet.tweetType === "reply") {
    originalTweetAuthor.refetch();
  }

  return (
    <div>
      {tweet?.originalTweet && isReply && (
        <TweetCard
          tweetId={tweet.originalTweet}
          pageType="home"
          isReply={true}
          hideActions={false}
          isAuthenticated={isAuthenticated}
        />
      )}
      <article
        onClick={navigateTweetDetails}
        className="cursor-pointer max-w-full hover:bg-gray-tweetHover duration-200"
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
                  isAuthenticated={isAuthenticated}
                  tweet={tweet}
                  pageType="home"
                />

                {tweet.tweetType === "reply" && (
                  <div>
                    <span className="mr-1">Replying to</span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `/${originalTweetAuthor.data?.username}/status/${tweet?.originalTweet}`
                        );
                      }}
                      className="mr-1 text-primary-base hover:underline cursor-pointer"
                    >
                      @{originalTweetAuthor.data?.username}
                    </span>
                  </div>
                )}

                <TweetContent tweet={tweet} pageType="home" />

                <TweetMedia tweet={tweet} />

                {tweet?.pollId && (
                  <Poll isAuthenticated={isAuthenticated} pollId={tweet.pollId} />
                )}

                {!hideActions && (
                  <TweetActions
                    pageType={"home"}
                    tweet={tweet}
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

export default React.memo(Tweet);
