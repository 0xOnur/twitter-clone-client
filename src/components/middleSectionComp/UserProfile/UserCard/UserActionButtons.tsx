import {useState} from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/config/store";
import { IUser } from "@customTypes/UserTypes";

interface IProps {
    user: IUser;
}

const UserActionButtons = ({user}: IProps) => {
  const reduxUser = useSelector((state: RootState) => state.user);

  const [followButtonText, setButtonText] = useState<string>(
    "Following" || "Unfollow"
  );

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

  if (reduxUser.isAuthenticated) {
    return (
      <div className="absolute top-0 py-3 px-4 right-0">
        {reduxUser.user.username === user.username ? (
          <button className="px-4 py-2 text-base leading-5 font-bold border rounded-full hover:bg-gray-lightest duration-200">
            Edit profile
          </button>
        ) : reduxUser.user.following?.includes(user._id) ? (
          <button
            onMouseOver={handleFollowHover}
            onMouseOut={handleFollowOut}
            className={followerTextClasses}
          >
            {followButtonText}
          </button>
        ) : (
          <button className="px-4 py-2 text-sm font-bold text-white bg-primary-base rounded-full">
            Follow
          </button>
        )}
      </div>
    );
  }

  return null;
};

export default UserActionButtons;
