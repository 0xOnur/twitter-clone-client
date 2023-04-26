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
          className="rounded-full w-12 h-12 hover:brightness-90"
        />
      </div>
      
    </div>
  );
};

export default Avatar;
