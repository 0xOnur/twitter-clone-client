import React, { useState } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "@redux/config/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeTweet, unlikeTweet } from "api/tweetApi";
import { TweetCardComp } from "@components/middleSectionComp/index";
import { DigalogModals } from "@components/middleSectionComp";
import { formatNumber } from "@utils/index";
import {
  ReplyIcon,
  ReTweetIcon,
  LikeIcon,
  AnalyticsIcon,
  ShareIcon,
  BookmarksIcon,
  LikedIcon,
} from "@icons/Icon";
import { ITweet } from "@customTypes/TweetTypes";
import ReTweetMenu from "./ReTweetMenu";
import useToast from "@hooks/useToast";

interface Props {
  pageType: "home" | "TweetDetails";
  tweet: ITweet;
  replyCount?: number;
  retweetCount?: number;
  isAuthenticated: boolean;
}

const TweetActions = ({
  tweet,
  replyCount,
  retweetCount,
  pageType,
  isAuthenticated,
}: Props) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const likeMutation = useMutation({
    mutationKey: ["likeTweet", tweet._id],
    mutationFn: likeTweet,
    onError: (err: any) => {
      console.log(err);
      showToast(err?.message || "error", "error");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tweet", tweet._id]);
    },
  });

  const unlikeMutation = useMutation({
    mutationKey: ["unlikeTweet", tweet._id],
    mutationFn: unlikeTweet,
    onError: (err: any) => {
      console.log(err);
      showToast(err?.message || "error", "error");
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tweet", tweet._id]);
    }
  });


  const reduxUser = useSelector((state: RootState) => state.user);
  const [composerMode, setComposerMode] = useState<"reply" | "quote">("reply");

  const [showReplyModal, setReplyModal] = useState(false);
  const [showQuoteModal, setQuoteModal] = useState(false);

  const [shareMenu, setShowShareMenu] = useState(false);
  const [reTweetMenu, setShowRetweetMenu] = useState(false);

  const handleIconClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const actionName = e.currentTarget.name;

    if (isAuthenticated) {
      switch (actionName) {
        case "reply":
          setComposerMode("reply");
          setReplyModal(true);
          break;
        case "like":
          if (tweet.likes?.includes(reduxUser.user?._id)) {
            unlikeMutation.mutate(tweet._id);
          } else {
            likeMutation.mutate(tweet._id);
          }
          break;
        case "bookmarks":
      }
    }
  };

  const actionClasses = classNames({
    "flex flex-row justify-between gap-2 mt-3 max-w-md w-full":
      pageType === "home",
    "flex flex-row border-b justify-around gap-2 h-12 items-center mx-1 w-full":
      pageType === "TweetDetails",
  });

  return (
    <div>
      {showReplyModal && isAuthenticated && (
        <DigalogModals.ReplyQuoteModal
          composerMode={composerMode}
          tweet={tweet}
          isOpen={showReplyModal}
          onClose={() => setReplyModal(false)}
        />
      )}

      {showQuoteModal && isAuthenticated && (
        <DigalogModals.ReplyQuoteModal
          composerMode={composerMode}
          tweet={tweet}
          isOpen={showQuoteModal}
          onClose={() => setQuoteModal(false)}
        />
      )}

      <div className={actionClasses}>
        <button
          onClick={handleIconClick}
          name="reply"
          className="group h-5 min-h-max"
        >
          <div className="flex flex-row">
            <div className=" relative text-gray-dark group-hover:text-primary-base duration-150">
              <div className="absolute -m-2 group-hover:bg-primary-hover duration-150 rounded-full top-0 right-0 left-0 bottom-0" />
              <ReplyIcon className={"w-5 h-5"} />
            </div>
            <div className="inline-flex  group-hover:text-primary-base">
              <span className="px-3 text-sm">
                {replyCount! > 0 &&
                  pageType === "home" &&
                  formatNumber(replyCount!)}
              </span>
            </div>
          </div>
        </button>

        <div
          onClick={(e) => {
            setShowRetweetMenu(!reTweetMenu);
            e.stopPropagation();
          }}
          className="group h-5 min-h-max relative cursor-pointer"
        >
          <div className="flex flex-row">
            <div className="inline-flex relative text-gray-dark group-hover:text-green-base duration-150">
              <div className="absolute -m-2 group-hover:bg-green-extraLigt  duration-150 rounded-full top-0 right-0 left-0 bottom-0" />
              <ReTweetIcon className="w-5 h-5" />
            </div>
            <div className="inline-flex group-hover:text-green-base">
              <span className="px-3 text-sm">
                {retweetCount! > 0 &&
                  pageType === "home" &&
                  formatNumber(retweetCount!)}
              </span>
            </div>
          </div>
          {reTweetMenu && isAuthenticated && (
            <ReTweetMenu
              onClose={() => setShowRetweetMenu(false)}
              setComposerMode={setComposerMode}
              setQuoteModal={setQuoteModal}
            />
          )}
        </div>

        <button
          onClick={handleIconClick}
          name="like"
          className="group h-5 min-h-max"
        >
          <div className="flex flex-row">
            <div className="inline-flex relative text-gray-dark group-hover:text-red-base duration-150">
              <div className="absolute -m-2 group-hover:bg-red-extraLight duration-150 rounded-full top-0 right-0 left-0 bottom-0"></div>
              {tweet.likes?.includes(reduxUser.user?._id) ? (
                <LikedIcon className={"w-5 h-5 fill-red-removeText"} />
              ) : (
                <LikeIcon className={"w-5 h-5"} />
              )}
            </div>
            <div className="inline-flex  group-hover:text-red-base">
              <span className="px-3 text-sm">
                {tweet?.likes!.length! > 0 &&
                  pageType === "home" &&
                  formatNumber(tweet.likes!.length)}
              </span>
            </div>
          </div>
        </button>

        {pageType === "TweetDetails" && (
          <button
            onClick={handleIconClick}
            name="bookmarks"
            className="group h-5 min-h-max"
          >
            <div className="flex flex-row">
              <div className="inline-flex relative text-gray-dark group-hover:text-primary-base duration-150">
                <div className="absolute -m-2 group-hover:bg-primary-hover duration-150 rounded-full top-0 right-0 left-0 bottom-0"></div>
                <BookmarksIcon isActive={false} className={"w-5 h-5"} />
              </div>
            </div>
          </button>
        )}

        {pageType !== "TweetDetails" && (
          <button
            onClick={handleIconClick}
            name="analyze"
            className="group h-5 min-h-max"
          >
            <div className="flex flex-row">
              <div className="inline-flex relative text-gray-dark group-hover:text-primary-base duration-150">
                <div className="absolute -m-2 group-hover:bg-primary-hover duration-150 rounded-full top-0 right-0 left-0 bottom-0"></div>
                <AnalyticsIcon className={"w-5 h-5"} />
              </div>
              <div className="inline-flex  group-hover:text-primary-base">
                <span className="px-3 text-sm">
                  {formatNumber(tweet?.view)}
                </span>
              </div>
            </div>
          </button>
        )}

        <div
          className="group h-5 min-h-max relative"
          role="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowShareMenu(!shareMenu);
          }}
        >
          <div className="flex flex-row group-hover:text-primary-base duration-150">
            <div className="inline-flex relative ">
              <div className="absolute -m-2 group-hover:bg-primary-hover duration-150 rounded-full top-0 right-0 left-0 bottom-0 "></div>
              <ShareIcon className={"w-5 h-5"} />
            </div>
          </div>
          {shareMenu && (
            <TweetCardComp.ShareMenu
              onClose={() => setShowShareMenu(false)}
              tweet={tweet}
              isAuthenticated={isAuthenticated}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TweetActions;
