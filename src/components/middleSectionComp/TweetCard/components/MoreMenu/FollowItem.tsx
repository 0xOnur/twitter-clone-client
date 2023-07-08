import useFollowsMutation from "@hooks/mutations/useFollowsMutation";
import { UserState } from "@redux/slices/userSlice";
import { FollowIcon } from "@icons/Icon";
import { IUser } from "@customTypes/UserTypes";

interface IProps {
  user: IUser;
  reduxUser: UserState;
  onClose: () => void;
}

const FollowItem = ({ user, reduxUser, onClose }: IProps) => {
  const { followUserMutation, unFollowUserMutation } = useFollowsMutation({
    reduxUser,
    username: user.username,
  });

  const isFollowing = reduxUser.user.following.includes(user._id);

  const handleFollowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose();
    if (isFollowing) {
      unFollowUserMutation.mutate(user._id);
    } else {
      followUserMutation.mutate(user._id);
    }
  };

  return (
    <button
      onClick={handleFollowClick}
      className="flex flex-row  hover:bg-gray-lightest rounded-t-2xl font-bold"
    >
      <div className="flex flex-row py-3 px-4 items-center">
        <div className="mr-2">
          <FollowIcon className={"w-5 h-5"} />
        </div>
        <div>
            {isFollowing ? <span>Unfollow @{user.username}</span> : <span>Follow @{user.username}</span>}
        </div>
      </div>
    </button>
  );
};

export default FollowItem;
