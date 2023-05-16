import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { DigalogModals } from "@components/middleSectionComp";
import { ITweet } from "@customTypes/TweetTypes";
import {
  AuthorInfo,
  Avatar,
  TweetContent,
  TweetActions,
  ReTweetedBy,
} from "@components/middleSectionComp/TweetCard/components";

interface IProps {
  isAuthenticated: boolean;
  tweet: ITweet;
  tweetStats: {replyCount: number, retweetCount:number, quoteCount:number}
  showReplyModal: boolean;
  showQuoteModal: boolean;
  setShowReply: React.Dispatch<React.SetStateAction<boolean>>;
  setQuoteModal: React.Dispatch<React.SetStateAction<boolean>>;
  setComposerMode: React.Dispatch<React.SetStateAction<"reply" | "quote">>;
}

const BasicCard = ({
  isAuthenticated,
  tweet,
  tweetStats,
  setShowReply,
  setQuoteModal,
  setComposerMode,
  showReplyModal,
  showQuoteModal,
}: IProps) => {
  

  const navigate = useNavigate();

  const navigateTweetDetails = () => {
    navigate(`/${tweet.author.username}/status/${tweet._id}`);
  };

  return (
    <div>
      {showReplyModal && isAuthenticated && (
        <DigalogModals.ReplyQuoteModal
          composerMode={"reply"}
          tweet={tweet}
          isOpen={showReplyModal}
          onClose={() => setShowReply(false)}
        />
      )}

      {showQuoteModal && isAuthenticated && (
        <DigalogModals.ReplyQuoteModal
          composerMode={"quote"}
          tweet={tweet}
          isOpen={showQuoteModal}
          onClose={() => setQuoteModal(false)}
        />
      )}

      <article
        onClick={navigateTweetDetails}
        className="cursor-pointer border-b border-t hover:bg-gray-tweetHover duration-200"
      >
        <div className="px-4 min-w-fit">
          <div className="flex flex-col mt-2">
            {tweet.tweetType === "retweet" && (
              <ReTweetedBy reTweeterUser={tweet.author} />
            )}

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
                <TweetContent tweet={tweet} pageType="home" />
                {tweetStats && (
                  <TweetActions
                    pageType={"home"}
                    tweet={tweet}
                    replyCount={tweetStats.replyCount}
                    retweetCount={tweetStats.retweetCount}
                    setReplyModal={setShowReply}
                    setComposerMode={setComposerMode}
                    setQuoteModal={setQuoteModal}
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

export default BasicCard;
