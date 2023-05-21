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
    "min-w-[110px] min-h-[36px] px-4 py-2 font-bold border rounded-full",
    {
      "hover:bg-red-remove hover:text-red-removeText duration-200":
        followButtonText === "Unfollow",
    }
  );

  return (
    <div className="absolute top-0 py-3 px-4 right-0">
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
        <button
          onClick={handleFollowClick}
          className="px-4 py-2 text-sm font-bold text-white bg-primary-base hover:bg-primary-dark rounded-full"
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default FollowUnfollow;
