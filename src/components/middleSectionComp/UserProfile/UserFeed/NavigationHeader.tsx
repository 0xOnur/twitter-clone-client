import React from "react";
import classNames from "classnames";

import { useNavigate } from "react-router-dom";

interface IProps {
  username: string;
  tab: string;
}


const NavigationHeader = ({username, tab}: IProps) => {
  const navigate = useNavigate();
  

  console.log(username, tab);

  const linkClasses = classNames(
    "flex flex-col w-full items-center hover:bg-gray-extraLight duration-200"
  );

  const linkTextClasses = (
    currentTab: "tweets" | "replies" | "media" | "likes"
  ) =>
    classNames("leading-5", {
      "font-bold": tab === currentTab,
    });

  return (
    <div className="flex flex-row border-b">
      <button onClick={() => navigate(`/${username}`)} className={linkClasses}>
        <div className="flex flex-col justify-center px-4 min-w-[56px] h-[53px]">
          <div className="flex flex-row relative justify-center h-full py-4">
            <span className={linkTextClasses("tweets")}>Tweets</span>
            {tab === "tweets" && (
              <div className="absolute bottom-0 h-1 min-w-[56px] w-full bg-primary-base" />
            )}
          </div>
        </div>
      </button>

      <button
        onClick={() => navigate(`/${username}/replies`)}
        className={linkClasses}
      >
        <div className="flex flex-col justify-center px-4 min-w-[56px] h-[53px]">
          <div className="flex flex-row relative justify-center h-full py-4">
            <span className={linkTextClasses("replies")}>Replies</span>
            {tab === "replies" && (
              <div className="absolute bottom-0 h-1 min-w-[56px] w-full bg-primary-base" />
            )}
          </div>
        </div>
      </button>
      <button
        onClick={() => navigate(`/${username}/media`)}
        className={linkClasses}
      >
        <div className="flex flex-col justify-center px-4 min-w-[56px] h-[53px]">
          <div className="flex flex-row relative justify-center h-full py-4">
            <span className={linkTextClasses("media")}>Media</span>
            {tab === "media" && (
              <div className="absolute bottom-0 h-1 min-w-[56px] w-full bg-primary-base" />
            )}
          </div>
        </div>
      </button>
      <button
        onClick={() => navigate(`/${username}/likes`)}
        className={linkClasses}
      >
        <div className="flex flex-col justify-center px-4 min-w-[56px] h-[53px]">
          <div className="flex flex-row relative justify-center h-full py-4">
            <span className={linkTextClasses("likes")}>Likes</span>
            {tab === "likes" && (
              <div className="absolute bottom-0 h-1 min-w-[56px] w-full bg-primary-base" />
            )}
          </div>
        </div>
      </button>
    </div>
  );
};

export default React.memo(NavigationHeader);
