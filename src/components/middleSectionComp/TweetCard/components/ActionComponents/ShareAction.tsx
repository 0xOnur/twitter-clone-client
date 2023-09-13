import React, { useState, useRef, useCallback, useEffect } from "react";
import { UserState } from "@redux/slices/userSlice";
import { ShareIcon } from "@icons/Icon";
import TweetShareMenu from "./ShareMenu";

interface IProps {
  isAuthenticated: boolean;
  reduxUser: UserState;
  tweet: ITweet;
}

const ShareAction = ({ isAuthenticated, reduxUser, tweet }: IProps) => {
  const [shareMenu, setShowShareMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    },
    [menuRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);

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
        <div ref={menuRef}>
          <TweetShareMenu
            isAuthenticated={isAuthenticated}
            reduxUser={reduxUser}
            tweet={tweet}
          />
        </div>
      )}
    </div>
  );
};

export default ShareAction;
