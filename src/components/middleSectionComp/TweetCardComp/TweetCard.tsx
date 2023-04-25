import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ITweet } from "@customTypes/TweetTypes";
import { DigalogModals } from "@components/middleSectionComp";
import Avatar from "./Avatar";
import AuthorInfo from "./AuthorInfo";
import TweetContent from "./TweetContent";
import TweetActions from "./TweetActions";
import ReTweetedBy from "./ReTweetedBy";
import classNames from "classnames";

import { TweetStats } from "@components/middleSectionComp/TweetDetailsComp";
import { ComposerComp } from "@components/middleSectionComp";

interface IProps {
  pageType: string;
  tweet: ITweet;
}

const TweetCard = ({ tweet, pageType }:IProps) => {
  const navigate = useNavigate();

  const [composerMode, setComposerMode] = useState("");

  const [showReplyModal, setShowReply] = useState(false);

  const [showQuoteModal, setQuoteModal] = useState(false)

  const handleTweetClick = () => {
    pageType === "home" &&
      navigate(`/${tweet.author.username}/status/${tweet._id}`);
  };

  const articleClasses = classNames({
    "cursor-pointer duration-200 hover:bg-gray-tweetHover border-b border-t":
      pageType === "home",
  });

  const navigateUser = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(`/${tweet.author.username}`);
  }


  return (
    <div>
    {
      showReplyModal && (
        <DigalogModals.ReplyQuoteModal
          composerMode={"reply"}
          tweet={tweet}
          isOpen={showReplyModal}
          onClose={() => setShowReply(false)}
        />
      )
    }

    {
      showQuoteModal && (
        <DigalogModals.ReplyQuoteModal
          composerMode={"quote"}
          tweet={tweet}
          isOpen={showQuoteModal}
          onClose={() => setQuoteModal(false)}
        />
      )
    }

    <article className={articleClasses} onClick={handleTweetClick}>
      <div className="px-4 min-w-fit">
        <div className="flex flex-col mt-2">
          {pageType === "home" && tweet.tweetType === "retweet" && (
            <ReTweetedBy reTweeterUser={tweet.author} />
          )}

          <div className="flex flex-row">
            {pageType !== "TweetDetails" && (
              <div onClick={navigateUser}>
                <Avatar
                  avatar={tweet.author.avatar}
                  username={tweet.author.username}
                />
              </div>
              
            )}

            <div className="flex flex-col pb-3 flex-grow">
              {pageType === "TweetDetails" && (
                <div className="flex flex-row items-center">
                  <Avatar
                    avatar={tweet.author.avatar}
                    username={tweet.author.username}
                  />
                  <AuthorInfo
                    pageType="tweetDetails"
                    username={tweet.author.username}
                    displayName={tweet.author.displayName}
                    isVerified={tweet.author.isVerified}
                    createdAt={tweet.createdAt}
                  />
                </div>
              )}

              {pageType !== "TweetDetails" && (
                <div onClick={navigateUser}>
                  <AuthorInfo
                    pageType="home"
                    username={tweet.author.username}
                    displayName={tweet.author.displayName}
                    isVerified={tweet.author.isVerified}
                    createdAt={tweet.createdAt}
                  />
                </div>
              )}

              <TweetContent tweet={tweet} />

              {pageType === "TweetDetails" && <TweetStats tweet={tweet} />}

              <TweetActions
                pageType={pageType}
                tweet={tweet}
                setShowReply={setShowReply}
                setComposerMode={setComposerMode}
                setQuoteModal={setQuoteModal}

              />

              {pageType === "TweetDetails" && (
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

              {pageType === "TweetDetails" && (
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
