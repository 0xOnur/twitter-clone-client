import React from "react";
import { formatDate } from "@utils/index";
import { TreeDotIcon, VerifiedIcon } from "@icons/Icon";
import classNames from "classnames";

type Props = {
  pageType: string
  displayName: string;
  username: string;
  isVerified: boolean;
  createdAt: string;
};

const AuthorInfo = ({ displayName, username, createdAt, pageType, isVerified }: Props) => {

  const userFlexClasses = classNames("flex", {
    "flex-row items-center": pageType === "home",
    "flex-col": pageType === "tweetDetails",
  })


  return (
    <div className="flex flex-col relative min-w-max mb-2px w-full">
      <div className="flex flex-row justify-between items-center">
        <div className={userFlexClasses}>
          <div className="flex text-lg items-center" >
            <a href={`/${username}`}>
              <span className="font-bold hover:underline underline-offset-1">{displayName}</span>
            </a>
            <span className="text-primary-base ml-1">{isVerified === true && (<VerifiedIcon className={"w-5 h-5"} />)}</span>
          </div>
          <div>
            <a href={`/${username}`}>
              {pageType === "home" ? (
                <div>
                  <span className="text-gray-dark ml-1">@{username} - </span>
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
