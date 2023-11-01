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
import ReplyTo from "../components/Other/ReplyTo";

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
        className="cursor-pointer relative group/tweet"
      >
        <div className="absolute w-full h-full -z-10 opacity-40 group-hover/tweet:bg-[color:var(--background-third)] duration-200" />
        <div className="flex flex-row pt-3 px-4">
          {isReply ? (
            <div className="flex flex-col justify-center items-center">
              <Avatar
                avatar={tweet.author.avatar!}
                href={`/${tweet.author.username}`}
              />
              <div className="w-[2px] -ml-3 mt-1 h-full bg-[color:var(--color-base-secondary)] opacity-30" />
            </div>
          ) : (
            <Avatar
              avatar={tweet.author.avatar!}
              href={`/${tweet.author.username}`}
            />
          )}

          <div className="grid flex-grow pb-3">
            <AuthorInfo
              isAuthenticated={isAuthenticated}
              tweet={tweet}
              pageType="home"
            />

            {tweet.tweetType === "reply" && (
              <ReplyTo
                username={originalTweetAuthor.data?.username}
                url={`/${originalTweetAuthor.data?.username}/status/${tweet?.originalTweet}`}
              />
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
      </article>
    </div>
  );
};

export default React.memo(Tweet);
