import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { ITweet } from "@customTypes/TweetTypes";
import { DigalogModals } from "@components/middleSectionComp";
import { TweetStats } from "@components/middleSectionComp/TweetDetailsComp";
import { ComposerComp } from "@components/middleSectionComp";
import Avatar from "./Avatar";
import AuthorInfo from "./AuthorInfo";
import TweetContent from "./TweetContent";
import TweetActions from "./TweetActions";
import ReTweetedBy from "./ReTweetedBy";

interface IProps {
  pageType: "home" | "TweetDetails";
  tweet: ITweet;
  isAuthenticated: boolean;
}

const TweetCard = ({ tweet, pageType, isAuthenticated }: IProps) => {
  const navigate = useNavigate();

  const [composerMode, setComposerMode] = useState("");

  const [showReplyModal, setShowReply] = useState(false);

  const [showQuoteModal, setQuoteModal] = useState(false);

  const handleTweetClick = () => {
    pageType === "home" &&
      navigate(`/${tweet.author.username}/status/${tweet._id}`);
  };

  const articleClasses = classNames({
    "cursor-pointer duration-200 hover:bg-gray-tweetHover border-b border-t":
      pageType === "home",
  });

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

      <article className={articleClasses} onClick={handleTweetClick}>
        <div className="px-4 min-w-fit">
          <div className="flex flex-col mt-2">
            {pageType === "home" && tweet.tweetType === "retweet" && (
              <ReTweetedBy reTweeterUser={tweet.author} />
            )}

            <div className="flex flex-row">
              {pageType !== "TweetDetails" && (
                <Avatar
                  avatar={tweet.author.avatar}
                  username={tweet.author.username}
                />
              )}

              <div className="flex flex-col pb-3 flex-grow">
                {pageType === "TweetDetails" && (
                  <div className="flex flex-row items-center">
                    <Avatar
                      avatar={tweet.author.avatar}
                      username={tweet.author.username}
                    />
                    <AuthorInfo
                      pageType={pageType}
                      username={tweet.author.username}
                      displayName={tweet.author.displayName}
                      isVerified={tweet.author.isVerified}
                      createdAt={tweet.createdAt}
                    />
                  </div>
                )}

                {pageType !== "TweetDetails" && (
                  <AuthorInfo
                    pageType="home"
                    username={tweet.author.username}
                    displayName={tweet.author.displayName}
                    isVerified={tweet.author.isVerified}
                    createdAt={tweet.createdAt}
                  />
                )}

                <TweetContent tweet={tweet} />

                {pageType === "TweetDetails" && <TweetStats tweet={tweet} />}

                <TweetActions
                  pageType={pageType}
                  tweet={tweet}
                  setShowReply={setShowReply}
                  setComposerMode={setComposerMode}
                  setQuoteModal={setQuoteModal}
                  isAuthenticated={isAuthenticated}
                />

                {pageType === "TweetDetails" && isAuthenticated && (
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

                {pageType === "TweetDetails" && isAuthenticated && (
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

export default TweetCard;
