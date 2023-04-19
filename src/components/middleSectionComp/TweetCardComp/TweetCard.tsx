import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TweetProps } from "@customTypes/TweetTypes";
import ReplyModal from "./ReplyModal";
import Avatar from "./Avatar";
import AuthorInfo from "./AuthorInfo";
import TweetContent from "./TweetContent";
import TweetActions from "./TweetActions";

import {ReTweetIcon} from "@icons/Icon"

interface IProps {
  tweet: TweetProps;
}

const TweetCard: React.FC<IProps> = ({ tweet }) => {
  const navigate = useNavigate();

  const [composerMode, setComposerMode] = useState("")

  
  const [showReplyModal, setShowReply] = useState(false);

  const handleTweetClick = (event: React.MouseEvent) => {
    navigate(`/${tweet.author.username}/status/${tweet._id}`);
  };

  

  return (
    <>
      {
        showReplyModal && (
          <ReplyModal
            tweet={tweet}
            setShowReply={setShowReply}
            composerMode={composerMode}
          />
        )
      }

      <article className="tweet relative border-b border-t" onClick={handleTweetClick}>
        <div className="px-4 cursor-pointer min-w-min relative">
          <div className="flex flex-col ">
            
            
            <div className="pt-3">
              <div className="flex flex-row relative items-center -mt-1 mb-1">
                <div className="basis-12 mr-3">
                  <span className="float-right">
                    <ReTweetIcon className={"w-4 h-4"} />
                  </span>
                </div>
                <span className="font-semibold text-gray-600 leading-5">
                  Ahbap Retweeteed
                </span>
              </div>
            </div>

            <div className="flex flex-row">
              <Avatar
                avatar={tweet.author.avatar}
                username={tweet.author.username}
              />
              
              <div className="flex flex-col pb-3 flex-grow">
                <AuthorInfo
                  username={tweet.author.username}
                  name={tweet.author.name}
                  createdAt={tweet.createdAt}
                />
                
                <TweetContent 
                  tweet = {tweet}
                />

                <TweetActions
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
