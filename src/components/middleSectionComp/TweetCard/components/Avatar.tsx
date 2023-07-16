import classNames from "classnames";
import React from "react";

type Props = {
  avatar: string;
  username: string;
  avatarSize?: string;
};

const Avatar = ({ avatar, username, avatarSize }: Props) => {
  const sizeClass = avatarSize ? avatarSize : "w-11 h-11"

  const avatarClassName = classNames(
    "cursor-pointer object-cover hover:brightness-90 rounded-full",
    sizeClass
  )

  return (
    <div className="mr-3 items-center min-w-max">
      <a 
        onClick={(e) => e.stopPropagation()}
        href={`/${username}`}
      >
        <img
          src={avatar}
          alt="profile"
          className={avatarClassName}
        />
      </a>
      
    </div>
  );
};

export default Avatar;
