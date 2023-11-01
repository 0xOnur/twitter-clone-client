import React from "react";
import classNames from "classnames";

import { useNavigate } from "react-router-dom";

interface IProps {
  username: string;
  tab: "replies" | "media" | "likes" | "tweets";
}

const NavigationHeader = ({ username, tab }: IProps) => {
  const navigate = useNavigate();

  const linkTextClasses = (
    currentTab: "tweets" | "replies" | "media" | "likes"
  ) =>
    classNames("leading-5", {
      "font-bold": tab === currentTab,
      "text-[color:var(--color-base-secondary)]": tab !== currentTab
    });

  return (
    <div className="flex flex-row border-b-2 border-[color:var(--background-third)]">
      <button
        onClick={() => navigate(`/${username}`)}
        className="flex flex-col w-full items-center hover:bg-[color:var(--background-third)] duration-200"
      >
        <div className="flex flex-col justify-center px-4 min-w-[56px] h-[53px]">
          <div className="flex flex-row relative justify-center h-full py-4">
            <span className={linkTextClasses("tweets")}>Tweets</span>
            {tab === "tweets" && (
              <div className="absolute bottom-0 h-1 min-w-[56px] w-full bg-[color:var(--color-primary)]" />
            )}
          </div>
        </div>
      </button>

      <button
        onClick={() => navigate(`/${username}/replies`)}
        className="flex flex-col w-full items-center hover:bg-[color:var(--background-third)] duration-200"
      >
        <div className="flex flex-col justify-center px-4 min-w-[56px] h-[53px]">
          <div className="flex flex-row relative justify-center h-full py-4">
            <span className={linkTextClasses("replies")}>Replies</span>
            {tab === "replies" && (
              <div className="absolute bottom-0 h-1 min-w-[56px] w-full bg-[color:var(--color-primary)]" />
            )}
          </div>
        </div>
      </button>

      <button
        onClick={() => navigate(`/${username}/media`)}
        className="flex flex-col w-full items-center hover:bg-[color:var(--background-third)] duration-200"
      >
        <div className="flex flex-col justify-center px-4 min-w-[56px] h-[53px]">
          <div className="flex flex-row relative justify-center h-full py-4">
            <span className={linkTextClasses("media")}>Media</span>
            {tab === "media" && (
              <div className="absolute bottom-0 h-1 min-w-[56px] w-full bg-[color:var(--color-primary)]" />
            )}
          </div>
        </div>
      </button>
      <button
        onClick={() => navigate(`/${username}/likes`)}
        className="flex flex-col w-full items-center hover:bg-[color:var(--background-third)] duration-200"
      >
        <div className="flex flex-col justify-center px-4 min-w-[56px] h-[53px]">
          <div className="flex flex-row relative justify-center h-full py-4">
            <span className={linkTextClasses("likes")}>Likes</span>
            {tab === "likes" && (
              <div className="absolute bottom-0 h-1 min-w-[56px] w-full bg-[color:var(--color-primary)]" />
            )}
          </div>
        </div>
      </button>
    </div>
  );
};

export default React.memo(NavigationHeader);
