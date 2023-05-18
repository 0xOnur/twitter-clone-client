import React from "react";
import { IUser } from "@customTypes/UserTypes";
import { VerifiedIcon } from "@icons/Icon";

interface IProps {
  user: IUser;
}

const Username = ({ user }: IProps) => {
  return (
    <div>
      <div className="flex flex-row gap-1 items-center">
        <span className="text-xl font-extrabold">{user.displayName}</span>
        {user.isVerified && (
          <VerifiedIcon className="w-6 h-6 mt-1 text-primary-base" />
        )}
      </div>
      <span>@{user.username}</span>
    </div>
  );
};

export default Username;
