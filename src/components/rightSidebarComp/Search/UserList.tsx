import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { useNavigate } from "react-router-dom";
import { SelectedIcon, VerifiedIcon } from "@icons/Icon";

interface IProps {
  user: IUser;
  setSearchText?: React.Dispatch<React.SetStateAction<string>>;
  selectedUsers?: IUser[] | undefined;
  setSelectUsers?: React.Dispatch<React.SetStateAction<IUser[]>>;
}

const UserList = ({
  user,
  setSearchText,
  setSelectUsers,
  selectedUsers,
}: IProps) => {
  const navigate = useNavigate();

  const newSelectedUsers = [...(selectedUsers || [])];

  const isAddedUser = newSelectedUsers.some(
    (selectedUser) => selectedUser._id === user._id
  );

  const handleClick = () => {
    if (setSelectUsers && setSearchText) {
      if (!isAddedUser) {
        newSelectedUsers.push(user);
        setSelectUsers(newSelectedUsers);
        setSearchText("");
      }
    } else {
      navigate(`/${user.username}`);
    }
  };

  return (
    <button
      key={user._id}
      disabled={isAddedUser}
      type="button"
      onClick={handleClick}
      className="flex w-full items-center px-4 py-3 hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed"
    >
      <Avatar avatar={user?.avatar!} href={`/${user.username}`} />
      <div className="flex flex-col w-full min-w-0">
        <div className="flex flex-row items-center gap-1">
          <span className="truncate font-bold">{user.displayName}</span>
          <span>
            {user.isVerified && (
              <VerifiedIcon className="w-5 h-5 mt-1 text-primary-base" />
            )}
          </span>
        </div>
        <span className="flex text-sm text-gray-500">@{user.username}</span>
      </div>
      {isAddedUser && (
        <div>
          <SelectedIcon className="w-5 h-5 fill-primary-base" />
        </div>
      )}
    </button>
  );
};

export default UserList;
