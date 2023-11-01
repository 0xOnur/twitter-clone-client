import React from "react";
import { VerifiedIcon } from "@icons/Icon";

interface IProps {
  user: IUser;
}

const Username = ({ user }: IProps) => {
  return (
    <div className="flex flex-col max-w-600px">
      <div className="grid grid-cols-[auto,1fr] items-center pr-1">
        <span className="text-xl font-extrabold break-words min-w-0">
          {user.displayName}
        </span>
        {user.isVerified && (
          <VerifiedIcon className="w-6 h-6 mt-1 text-[color:var(--color-primary)]" />
        )}
      </div>

      <span className="text-[color:var(--color-base-secondary)]">
        @{user.username}
      </span>
    </div>
  );
};

export default Username;
