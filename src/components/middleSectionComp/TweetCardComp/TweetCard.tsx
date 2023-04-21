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

import TweetStats from "./TweetStats";

interface IProps {
  pageType: string;
  tweet: TweetProps;
}

const TweetCard: React.FC<IProps> = ({ tweet, pageType }) => {
  const navigate = useNavigate();

  const [composerMode, setComposerMode] = useState("");

  const [showReplyModal, setShowReply] = useState(false);

  const handleTweetClick = (event: React.MouseEvent) => {
    pageType==="home" && navigate(`/${tweet.author.username}/status/${tweet._id}`);
  };

  const articleClasses = classNames({
    "cursor-pointer duration-200 hover:bg-gray-tweetHover border-b border-t": pageType === "home",
  });

  return (
    <>
      {showReplyModal && (
        <ReplyModal
          tweet={tweet}
          setShowReply={setShowReply}
          composerMode={composerMode}
        />
      )}

      <article className={articleClasses} onClick={handleTweetClick}>
        <div className="px-4 min-w-fit">
          <div className="flex flex-col mt-2">
            {pageType !== "tweetDetails" && <ReTweetedBy />}

            <div className="flex flex-row">
              
              {pageType !== "tweetDetails" && (
                <Avatar
                  avatar={tweet.author.avatar}
                  username={tweet.author.username}
                />
              )}

              <div className="flex flex-col pb-3 flex-grow">
                {pageType === "tweetDetails" && (
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

                {pageType !== "tweetDetails" && (
                  <AuthorInfo
                    pageType="home"
                    username={tweet.author.username}
                    name={tweet.author.name}
                    createdAt={tweet.createdAt}
                  />
                )}

                <TweetContent tweet={tweet} />
                
                {pageType === "tweetDetails" && (
                  <TweetStats tweet={tweet} />
                )}
                

                <TweetActions
                  pageType={pageType}
                  tweet={tweet}
                  setShowReply={setShowReply}
                  setComposerMode={setComposerMode}
                />
              </div>

            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default TweetCard;
