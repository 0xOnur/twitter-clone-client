import classNames from "classnames";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { AppDispatch } from "redux/config/store";
import { updateRedux, followUser, unFollowUser } from "api/userApi";
import { IUser } from "@customTypes/UserTypes";
import { UserState } from "@redux/slices/userSlice";

interface IProps {
  user: IUser;
  reduxUser: UserState;
}

const FollowUnfollow = ({ user, reduxUser }: IProps) => {
  const queryClient = useQueryClient();
  const dispatch: AppDispatch = useDispatch();
  const [followButtonText, setButtonText] = useState<"Following" | "Unfollow">(
    "Following" || "Unfollow"
  );

  const followUserQuery = useMutation(followUser, {
    onSuccess: () => {
      setButtonText("Following");
      dispatch(updateRedux(reduxUser.user.username));
      queryClient.invalidateQueries(["user", user.username]);
    },
  });

  const unFollowUserQuery = useMutation(unFollowUser, {
    onSuccess: () => {
      setButtonText("Unfollow");
      dispatch(updateRedux(reduxUser.user.username));
      queryClient.invalidateQueries(["user", user.username]);
    },
  });

  const handleFollowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (reduxUser.user.following?.includes(user._id)) {
      unFollowUserQuery.mutate(user._id);
    } else {
      followUserQuery.mutate(user._id);
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
    "min-h-[36px] h-full px-4 font-bold border rounded-full duration-200",
    {
      "hover:bg-red-remove hover:text-red-removeText duration-200":
        followButtonText === "Unfollow",
    }
  );

  const followTextClasses = classNames(
    "min-h-[36px] h-full px-4 bg-black text-white font-bold border rounded-full duration-200"
  );

  if(reduxUser.user._id === user._id) {
    return null;
  }

  return (
    <div>
      {reduxUser.user.following.includes(user._id) ? (
        <button
          onClick={handleFollowClick}
          onMouseOver={handleFollowHover}
          onMouseOut={handleFollowOut}
          className={followerTextClasses}
        >
          {followButtonText}
        </button>
      ) : (
        <button onClick={handleFollowClick} className={followTextClasses}>
          Follow
        </button>
      )}
    </div>
  );
};

export default FollowUnfollow;
