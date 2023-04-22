import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TweetProps } from "@customTypes/TweetTypes";
import ReplyModal from "./ReplyModal";
import Avatar from "./Avatar";
import AuthorInfo from "./AuthorInfo";
import TweetContent from "./TweetContent";
import TweetActions from "./TweetActions";
import ReTweetedBy from "./ReTweetedBy";
import classNames from "classnames";

import {TweetStats} from "../TweetDetailsComp/";
import { ComposerComp } from "@components/middleSectionComp";

interface IProps {
  pageType: string;
  tweet: TweetProps;
}

const TweetCard: React.FC<IProps> = ({ tweet, pageType }) => {
  const navigate = useNavigate();

  const [composerMode, setComposerMode] = useState("reply");

  const [showReplyModal, setShowReply] = useState(false);

  const handleTweetClick = (event: React.MouseEvent) => {
    pageType === "home" &&
      navigate(`/${tweet.author.username}/status/${tweet._id}`);
  };

  const articleClasses = classNames({
    "cursor-pointer duration-200 hover:bg-gray-tweetHover border-b border-t":
      pageType === "home",
  });

  return (
    <>
      {showReplyModal && (
        <ReplyModal
          composerMode={composerMode}
          tweet={tweet}
          isOpen={showReplyModal}
          onClose={() => setShowReply(false)}
        />
      )}

      <article className={articleClasses} onClick={handleTweetClick}>
        <div className="px-4 min-w-fit">
          <div className="flex flex-col mt-2">
            {pageType !== "TweetDetails" && <ReTweetedBy />}

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
                      pageType="tweetDetails"
                      username={tweet.author.username}
                      name={tweet.author.name}
                      createdAt={tweet.createdAt}
                    />
                  </div>
                )}

                {pageType !== "TweetDetails" && (
                  <AuthorInfo
                    pageType="home"
                    username={tweet.author.username}
                    name={tweet.author.name}
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
                />

                {pageType === "TweetDetails" && (
                  <a href={`/${tweet.author.username}`}>
                    <div className="flex flex-row">
                      <div className="basis-12"></div>
                      <span>Replying to </span>
                      <span className="text-primary-base">
                        @{tweet.author.username}
                      </span>
                    </div>
                  </a>
                )}

                {pageType === "TweetDetails" && (
                  <ComposerComp.TweetComposer composerMode={composerMode} tweet={tweet} />
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default TweetCard;
