import { PersistPartial } from "redux-persist/es/persistReducer";
import { UserState } from "@redux/slices/userSlice";
import { Avatar } from "../TweetCard/components";
import { useNavigate } from "react-router-dom";
import { VerifiedIcon } from "@icons/Icon";
import { FollowsButton } from ".";

interface IProps {
  reduxUser: UserState & PersistPartial;
  user: IUser;
  showBio?: boolean;
}

const UserPreviewCard = ({ user, reduxUser, showBio }: IProps) => {
  const navigate = useNavigate();
  return (
    <div key={user._id} className="flex flex-col w-full">
      <div
        onClick={() => navigate(`/${user.username}`)}
        className="cursor-pointer py-3 px-3 hover:bg-gray-trendsHover duration-200"
      >
        <div className="flex flex-row w-full">
          <Avatar avatar={user?.avatar!} username={user?.username!} />
          <div className="flex flex-col w-full overflow-hidden">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-col w-full min-w-0 pr-2">
                <div className="flex flex-row items-center gap-1">
                  <a
                    href={`/${user.username}`}
                    onClick={(e) => e.stopPropagation()}
                    className="truncate font-bold hover:underline decoration-1"
                  >
                    {user.displayName}
                  </a>
                  <span>
                    {user.isVerified && (
                      <VerifiedIcon className="w-5 h-5 mt-1 text-primary-base" />
                    )}
                  </span>
                </div>
                <p className="truncate">@{user.username}</p>
              </div>
              <div>
                <FollowsButton user={user} reduxUser={reduxUser} />
              </div>
            </div>
            {showBio && (
              <div className="text-left pt-1">
                <span className="whitespace-pre-line">{user.bio}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreviewCard;
