import React, { useState } from "react";
import { TweetCardComp } from "@components/middleSectionComp";
import { ITweet } from "@customTypes/TweetTypes";
import { ShareIcon } from "@icons/Icon";

interface IProps {
  tweet: ITweet;
  isAuthenticated: boolean;
}

const ShareAction = ({ isAuthenticated, tweet }: IProps) => {
  const [shareMenu, setShowShareMenu] = useState(false);
  return (
    <div
      className="group h-5 min-h-max relative"
      role="button"
      onClick={(e) => {
        e.stopPropagation();
        setShowShareMenu(!shareMenu);
      }}
    >
      <div
        title="Share"
        className="flex flex-row group-hover:text-primary-base duration-150"
      >
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
  );
};

export default ShareAction;
