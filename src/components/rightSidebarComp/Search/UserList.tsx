import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { useNavigate } from "react-router-dom";
import { VerifiedIcon } from "@icons/Icon";

interface IProps {
  user: IUser;
  selectedUsers?: IUser[] | undefined
  setSelectUsers?: React.Dispatch<React.SetStateAction<IUser[]>>
}

const UserList = ({ user, setSelectUsers, selectedUsers }: IProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (setSelectUsers) {
      const newSelectedUsers = [...(selectedUsers || [])];
  
      if(!newSelectedUsers.some(selectedUser => selectedUser._id === user._id)){
        newSelectedUsers.push(user)
        setSelectUsers(newSelectedUsers);
      } 
    } else {
      navigate(`/${user.username}`);
    }
  }
  

  return (
    <button
      type="button"
      onClick={handleClick}
      key={user._id}
      className="flex w-full items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
    >
      <Avatar avatar={user?.avatar!} href={`/${user.username}`} />
      <div key={user._id} className="flex flex-col w-full min-w-0 ml-3">
        <div className="flex flex-row items-center gap-1">
          <span className="truncate font-bold ">{user.displayName}</span>
          <span>
            {user.isVerified && (
              <VerifiedIcon className="w-5 h-5 mt-1 text-primary-base" />
            )}
          </span>
        </div>
        <span className="flex text-sm text-gray-500">@{user.username}</span>
      </div>
    </button>
  );
};

export default UserList;
