import React from "react";
import { formatDate } from "@utils/index";
import { TreeDotIcon, VerifiedIcon } from "@icons/Icon";
import classNames from "classnames";
import { useNavigate } from 'react-router-dom'

type Props = {
  pageType: "home" | "TweetDetails"
  displayName: string;
  username: string;
  isVerified: boolean;
  createdAt: string;
};

const AuthorInfo = ({ displayName, username, createdAt, pageType, isVerified }: Props) => {
  const navigate = useNavigate();

  const userFlexClasses = classNames("flex", {
    "flex-row items-center": pageType === "home",
    "flex-col": pageType === "TweetDetails",
  })

  const navigateUser = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(`/${username}`);
  }

  return (
    <div className="flex flex-col relative min-w-max mb-2px w-full">
      <div className="flex flex-row justify-between items-center">
        <div className={userFlexClasses} onClick={navigateUser}>
          <div className="flex text items-center" >
              <span className="font-bold hover:underline underline-offset-1 cursor-pointer">{displayName}</span>
            <span className="text-primary-base ml-1">{isVerified === true && (<VerifiedIcon className={"w-5 h-5"} />)}</span>
          </div>
          <div onClick={navigateUser}>
            {pageType === "home" ? (
              <div>
                <span className="text-gray-dark ml-1 cursor-pointer">@{username} - </span>
                <span>{formatDate(createdAt)}</span>
              </div>
            ): (
              <span className="text-gray-dark cursor-pointer">@{username}</span>
            )}
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
