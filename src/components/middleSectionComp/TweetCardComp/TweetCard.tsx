import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ReplyIcon,
  ReTweetIcon,
  LikeIcon,
  AnalyticsIcon,
  ShareIcon,
  TreeDotIcon,
} from "@icons/Icon";
import { MiddleSection } from "@components/index";
import type { TweetsProps } from "../Tweet";
import { formatDate, formatNumber } from "@utils/index";

interface IProps {
  tweet: TweetsProps;
}

const TweetCard: React.FC<IProps> = ({ tweet }) => {
  const navigate = useNavigate();

  const [shareMenu, setShowShareMenu] = useState(false);

  const handleTweetClick = (event: React.MouseEvent) => {
    navigate(`/${tweet.owner.username}/status/${tweet._id}`);
  };

  const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const actionName = e.currentTarget.name;
    console.log(actionName);
  };

  return (
    <>
      <article className="tweet relative border-b" onClick={handleTweetClick}>
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
              <div className="mr-3 items-center min-w-max">
                <a href={`/${tweet.owner.username}`}>
                  <img
                    src={tweet.owner.avatar}
                    alt="profile"
                    className="rounded-full w-12 h-12"
                  />
                </a>
              </div>

              <div className="flex flex-col pb-3 flex-grow">
                <div className="flex flex-col relative min-w-max mb-2px">
                  <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center">
                      <div className="text-lg">
                        <a href={`/${tweet.owner.username}`}>
                          <span className="font-bold">{tweet.owner.name}</span>
                        </a>
                      </div>
                      <div className="ml-1">
                        <a href={`/${tweet.owner.username}`}>
                          <span className="text-gray-dark">
                            @{tweet.owner.username} -{" "}
                          </span>
                          <span>{formatDate(tweet.createdAt)}</span>
                        </a>
                      </div>
                    </div>
                    <div className=" group">
                      <div className=" relative text-gray-dark group-hover:text-primary-base duration-150">
                        <div className="absolute -m-2 group-hover:bg-primary-extraLight duration-150 rounded-full top-0 right-0 left-0 bottom-0 -z-10"></div>
                        <TreeDotIcon className={"w-5 h-5"} />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  {tweet.content.length > 280 ? (
                    <>
                      {tweet.content.slice(0, 280)}...
                      <a
                        className="text-primary-base"
                        href={`/${tweet.owner.username}/status/${tweet._id}`}
                      >
                        Show More
                      </a>
                    </>
                  ) : (
                    tweet.content
                  )}
                </div>

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
                            {formatNumber(tweet.comments.length)}
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
                            {formatNumber(tweet.retweets.length)}
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
                            {formatNumber(tweet.likes.length)}
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
                          <span className="px-3 text-sm">
                            {formatNumber(tweet.view)}
                          </span>
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
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default TweetCard;
