import useFollowsMutation from "@hooks/Follows/useFollowsMutation";
import { UserState } from "@redux/slices/userSlice";
import classNames from "classnames";
import { useState } from "react";

interface IProps {
  user: IUser;
  reduxUser: UserState;
}

const FollowsButton = ({ user, reduxUser }: IProps) => {
  const [followButtonText, setButtonText] = useState<"Following" | "Unfollow">(
    "Following" || "Unfollow"
  );

  const { followUserMutation, unFollowUserMutation } = useFollowsMutation({
    reduxUser,
    username: user.username,
    setButtonText,
  });

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
    "min-h-[36px] min-w-[110px] w-full h-full px-4 font-bold rounded-full border-2 border-[color:var(--color-base-secondary)] duration-200",
    {
      "hover:bg-red-base/20 hover:text-red-base hover:border-red-base duration-200":
        followButtonText === "Unfollow",
    }
  );

  if (reduxUser.user?._id === user._id || !reduxUser.isAuthenticated) {
    return null;
  }

  return (
    <div>
      {reduxUser.user?.following.includes(user._id) ? (
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
          className="min-h-[36px] min-w-[81px] h-full px-4 rounded-full border-2 border-[color:var(--background-third)] bg-[color:var(--color-base)] hover:opacity-80 duration-200"
        >
          <span className="font-bold text-[color:var(--background-primary)]">
            Follow
          </span>
        </button>
      )}
    </div>
  );
};

export default FollowsButton;
