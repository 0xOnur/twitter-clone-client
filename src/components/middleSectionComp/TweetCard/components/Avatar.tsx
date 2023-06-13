import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  avatar: string;
  username: string;
};

const Avatar = ({ avatar, username }: Props) => {
  const navigate = useNavigate();

  const navigateUser = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    navigate(`/${username}`);
  };

  return (
    <div className="mr-3 items-center min-w-max">
      <div onClick={navigateUser}>
        <img
          src={avatar}
          alt="profile"
          className="w-10 h-10 cursor-pointer object-cover hover:brightness-90 rounded-full"
        />
      </div>
      
    </div>
  );
};

export default Avatar;
