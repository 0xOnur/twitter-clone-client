import React, { useState } from "react";
import { MiddleSection } from "@components/index";
import { formatNumber } from "@utils/index";

import {
  ReplyIcon,
  ReTweetIcon,
  LikeIcon,
  AnalyticsIcon,
  ShareIcon,
} from "@icons/Icon";
import { TweetProps } from "@customTypes/TweetTypes";

type Props = {
  tweet: TweetProps;
  setComposerMode: React.Dispatch<React.SetStateAction<string>>
  setShowReply: React.Dispatch<React.SetStateAction<boolean>>
};

const TweetActions = ({ tweet, setComposerMode, setShowReply }: Props) => {
  const [shareMenu, setShowShareMenu] = useState(false);

  const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const actionName = e.currentTarget.name;
    if (actionName === "reply") {
      setShowReply(true);
      setComposerMode("reply");
    }
    console.log(actionName);
  };
  return (
    <div>
      <div className="flex flex-row justify-between gap-2 mt-3 max-w-md">
        <button
          onClick={handleIconClick}
          name="reply"
          className="group h-5 min-h-max"
        >
          <div className="flex leading-5 ">
            <div className=" relative text-gray-dark group-hover:text-primary-base duration-150">
              <div className="absolute -m-2 group-hover:bg-primary-hover duration-150 rounded-full top-0 right-0 left-0 bottom-0"></div>
              <ReplyIcon className={"w-5 h-5"} />
            </div>
            <div className="inline-flex  group-hover:text-primary-base">
              <span className="px-3 text-sm">
                {tweet.comments && formatNumber(tweet.comments.length)}
              </span>
            </div>
          </div>
        </button>

        <button
          onClick={handleIconClick}
          name="retweet"
          className="group h-5 min-h-max"
        >
          <div className="flex text-base leading-5">
            <div className="inline-flex relative text-gray-dark group-hover:text-green-base duration-150">
              <div className="absolute -m-2 group-hover:bg-green-extraLigt  duration-150 rounded-full top-0 right-0 left-0 bottom-0"></div>
              <ReTweetIcon className="w-5 h-5" />
            </div>
            <div className="inline-flex group-hover:text-green-base">
              <span className="px-3 text-sm">
                {tweet.retweets && formatNumber(tweet.retweets.length)}
              </span>
            </div>
          </div>
        </button>

        <button
          onClick={handleIconClick}
          name="like"
          className="group h-5 min-h-max"
        >
          <div className="flex text-base leading-5">
            <div className="inline-flex relative text-gray-dark group-hover:text-red-base duration-150">
              <div className="absolute -m-2 group-hover:bg-red-extraLight duration-150 rounded-full top-0 right-0 left-0 bottom-0"></div>
              <LikeIcon className={"w-5 h-5"} />
            </div>
            <div className="inline-flex  group-hover:text-red-base">
              <span className="px-3 text-sm">
                {tweet.likes && formatNumber(tweet.likes.length)}
              </span>
            </div>
          </div>
        </button>

        <button
          onClick={handleIconClick}
          name="analyze"
          className="group h-5 min-h-max"
        >
          <div className="flex text-base leading-5">
            <div className="inline-flex relative text-gray-dark group-hover:text-primary-base duration-150">
              <div className="absolute -m-2 group-hover:bg-primary-hover duration-150 rounded-full top-0 right-0 left-0 bottom-0"></div>
              <AnalyticsIcon className={"w-5 h-5"} />
            </div>
            <div className="inline-flex  group-hover:text-primary-base">
              <span className="px-3 text-sm">{formatNumber(tweet.view)}</span>
            </div>
          </div>
        </button>

        <div className="group h-5 min-h-max relative">
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowShareMenu(!shareMenu);
            }}
            className="flex text-base leading-5 group-hover:text-primary-base duration-150"
          >
            <div className="inline-flex relative ">
              <div className="absolute -m-2 group-hover:bg-primary-hover duration-150 rounded-full top-0 right-0 left-0 bottom-0 "></div>
              <ShareIcon className={"w-5 h-5"} />
            </div>
          </div>
          {shareMenu && (
            <MiddleSection.TweetCardComp.ShareMenu
              onClose={() => setShowShareMenu(false)}
              tweet={tweet}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TweetActions;
