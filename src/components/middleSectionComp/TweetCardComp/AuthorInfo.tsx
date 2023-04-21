import React from "react";
import { formatDate } from "@utils/index";
import { TreeDotIcon } from "@icons/Icon";
import classNames from "classnames";

type Props = {
  pageType: string
  name: string;
  username: string;
  createdAt: Date;
};

const AuthorInfo = ({ name, username, createdAt, pageType }: Props) => {

  const userClasses = classNames("flex items-center", {
    "flex-row": pageType === "home",
    "flex-col": pageType === "tweetDetails",
  })

  return (
    <div className="flex flex-col relative min-w-max mb-2px w-full">
      <div className="flex flex-row justify-between items-center">
        <div className={userClasses}>
          <div className="text-lg">
            <a href={`/${username}`}>
              <span className="font-bold">{name}</span>
            </a>
          </div>
          <div className="ml-1">
            <a href={`/${username}`}>
              {pageType === "home" ? (
                <div>
                  <span className="text-gray-dark">@{username} - </span>
                  <span>{formatDate(createdAt)}</span>
                </div>
              ): (
                <span className="text-gray-dark">@{username}</span>
              )}
            </a>
          </div>
        </div>
        <div className="group">
          <div className=" relative text-gray-dark group-hover:text-primary-base duration-150">
            <div className="absolute -m-2 group-hover:bg-primary-extraLight duration-150 rounded-full top-0 right-0 left-0 bottom-0 -z-10"></div>
            <TreeDotIcon className={"w-5 h-5"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorInfo;
