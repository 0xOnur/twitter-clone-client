import React from "react";
import { formatDate } from "@utils/index";
import { TreeDotIcon } from "@icons/Icon";

type Props = {
  name: string;
  username: string;
  createdAt: Date;
};

const AuthorInfo = ({ name, username, createdAt }: Props) => {
  return (
    <div className="flex flex-col relative min-w-max mb-2px">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <div className="text-lg">
            <a href={`/${username}`}>
              <span className="font-bold">{name}</span>
            </a>
          </div>
          <div className="ml-1">
            <a href={`/${username}`}>
              <span className="text-gray-dark">@{username} - </span>
              <span>{formatDate(createdAt)}</span>
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
  );
};

export default AuthorInfo;
