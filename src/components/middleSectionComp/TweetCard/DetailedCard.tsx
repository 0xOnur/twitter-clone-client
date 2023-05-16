import React from "react";
import { ComposerComp, DigalogModals } from "@components/middleSectionComp";
import { ITweet } from "@customTypes/TweetTypes";
import {
  AuthorInfo,
  Avatar,
} from "@components/middleSectionComp/TweetCard/components";
import TweetContent from "./components/TweetContent";
import { TweetStats } from "../TweetDetailsComp";
import TweetActions from "./components/TweetActions";

interface IProps {
  isAuthenticated: boolean;
  tweet: ITweet;
  tweetStats: { replyCount: number; retweetCount: number; quoteCount: number };
  showReplyModal: boolean;
  showQuoteModal: boolean;
  setReplyModal: React.Dispatch<React.SetStateAction<boolean>>;
  setQuoteModal: React.Dispatch<React.SetStateAction<boolean>>;
  composerMode: "reply" | "quote";
  setComposerMode: React.Dispatch<React.SetStateAction<"reply" | "quote">>;
}

const DetailedCard = ({
  tweet,
  tweetStats,
  isAuthenticated,
  setReplyModal,
  showReplyModal,
  setQuoteModal,
  showQuoteModal,
  composerMode,
  setComposerMode,
}: IProps) => {
  return (
    <div>
      {showReplyModal && isAuthenticated && (
        <DigalogModals.ReplyQuoteModal
          composerMode={"reply"}
          tweet={tweet}
          isOpen={showReplyModal}
          onClose={() => setReplyModal(false)}
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
      <article>
        <div className="px-4 min-w-fit border-b">
          <div className="flex flex-col mt-2">
            <div className="flex flex-row">
              <div className="flex flex-col flex-grow pb-3">
                <div className="flex flex-row items-center">
                  <Avatar
                    avatar={tweet.author.avatar!}
                    username={tweet.author.username!}
                  />
                  <AuthorInfo
                    pageType="TweetDetails"
                    username={tweet.author.username}
                    displayName={tweet.author.displayName}
                    isVerified={tweet.author.isVerified}
                    createdAt={tweet.createdAt}
                  />
                </div>

                <TweetContent tweet={tweet} pageType="TweetDetails" />

                {tweetStats && (
                  <TweetStats
                    tweet={tweet}
                    retweetCount={tweetStats?.retweetCount}
                    quoteCount={tweetStats?.quoteCount}
                  />
                )}

                <TweetActions
                  pageType="TweetDetails"
                  tweet={tweet}
                  replyCount={tweetStats?.replyCount}
                  retweetCount={tweetStats?.retweetCount}
                  setReplyModal={setReplyModal}
                  setComposerMode={setComposerMode}
                  setQuoteModal={setQuoteModal}
                  isAuthenticated={isAuthenticated}
                />

                {isAuthenticated && (
                  <div className="flex flex-row">
                    <div className="w-14"></div>
                    <a href={`/${tweet.author.username}`}>
                      <span>Replying to </span>
                      <span className="text-primary-base">
                        @{tweet.author.username}
                      </span>
                    </a>
                  </div>
                )}

                {isAuthenticated && (
                  <ComposerComp.TweetComposer
                    composerMode={composerMode}
                    originalTweet={tweet}
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

export default DetailedCard;
