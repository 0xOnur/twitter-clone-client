import React from "react";
import { formatDate } from "@utils/index";
import { TreeDotIcon, VerifiedIcon } from "@icons/Icon";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

type Props = {
  pageType: "home" | "TweetDetails";
  displayName: string;
  username: string;
  isVerified: boolean;
  createdAt: string;
};

const AuthorInfo = ({
  displayName,
  username,
  createdAt,
  pageType,
  isVerified,
}: Props) => {
  const navigate = useNavigate();

  const userFlexClasses = classNames("flex", {
    "flex-row items-center": pageType === "home",
    "flex-col": pageType === "TweetDetails",
  });

  const navigateUser = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(`/${username}`);
  };

  return (
    <div className="flex flex-col relative mb-2px w-full">
      <div className="flex flex-row justify-between items-center gap-10">
        <div className={userFlexClasses}>
          <div className="flex flex-row gap-1 items-center pr-1">
            <span 
              onClick={navigateUser}
              className="truncate max-w-[200px] font-bold cursor-pointer hover:underline duration-200">{displayName}
            </span>
            <span>
              {isVerified && (
                <VerifiedIcon className="w-5 h-5 mt-1 text-primary-base" />
              )}
            </span>
          </div>
            {pageType === "home" ? (
              <div className="min-w-fit">
                <span className="text-gray-dark cursor-pointer truncate">
                  @{username} -{" "}
                </span>
                <span>{formatDate(createdAt)}</span>
              </div>
            ) : (
              <span className="text-gray-dark cursor-pointer truncate">
                @{username}
              </span>
            )}
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
