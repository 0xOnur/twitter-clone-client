import useFollowsMutation from "@hooks/mutations/Follows/useFollowsMutation";
import { UserState } from "@redux/slices/userSlice";
import classNames from "classnames";
import { useState } from "react";

interface IProps {
  user: IUser;
  reduxUser: UserState;
}

const FollowUnfollow = ({ user, reduxUser }: IProps) => {
  const [followButtonText, setButtonText] = useState<"Following" | "Unfollow">(
    "Following" || "Unfollow"
  );

  const {followUserMutation, unFollowUserMutation} = useFollowsMutation({reduxUser, username: user.username, setButtonText})
 

  const handleFollowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (reduxUser.user?.following?.includes(user._id)) {
      unFollowUserMutation.mutate(user._id);
    } else {
      followUserMutation.mutate(user._id);
    }
  };

  const handleFollowHover = () => {
    if (followButtonText === "Following") {
      setButtonText("Unfollow");
    }
  };

  const handleFollowOut = () => {
    if (followButtonText === "Unfollow") {
      setButtonText("Following");
    }
  };

  const followerTextClasses = classNames(
    "min-h-[36px] min-w-[110px] w-full h-full px-4 font-bold border rounded-full duration-200",
    {
      "hover:bg-red-remove hover:text-red-removeText duration-200":
        followButtonText === "Unfollow",
    }
  );

  const followTextClasses = classNames(
    "min-h-[36px] h-full px-4 bg-black text-white font-bold border rounded-full hover:bg-slate-700 duration-200"
  );

  if(reduxUser.user?._id === user._id || !reduxUser.isAuthenticated) {
    return null;
  }

  return (
    <div>
      {reduxUser.user.following.includes(user._id) ? (
        <button
          type="button"
          onClick={handleFollowClick}
          onMouseOver={handleFollowHover}
          onMouseOut={handleFollowOut}
          className={followerTextClasses}
        >
          {followButtonText}
        </button>
      ) : (
        <button 
          type="button"
          onClick={handleFollowClick} 
          className={followTextClasses}
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default FollowUnfollow;
