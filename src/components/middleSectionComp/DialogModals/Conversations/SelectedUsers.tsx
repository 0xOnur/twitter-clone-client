import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { CancelIcon } from "@icons/Icon";
import React from "react";

interface IProps {
  selectedUsers: IUser[];
  setSelectUsers: React.Dispatch<React.SetStateAction<IUser[]>>
}

const SelectedUsers = ({ selectedUsers, setSelectUsers }: IProps) => {
    const handleRemove = (user: IUser) => {
        return () => {
            const newSelectedUsers = selectedUsers.filter((selectedUser) => selectedUser._id !== user._id);
            setSelectUsers(newSelectedUsers);
        }
    }
  return (
    <div className="flex flex-row flex-wrap p-1 border-b bg-white">
      {selectedUsers.map((user) => (
        <button
            key={user._id}
            onClick={handleRemove(user)}
            className="min-h-[32px] max-w-[90%] m-1 border rounded-full overflow-hidden"
        >
          <div className="flex flex-row h-full pl-1 pr-3 items-center hover:bg-primary-light duration-200">
            <Avatar avatar={user.avatar!} avatarSize="w-6 h-6" />
            <span className="font-bold truncate">{user.displayName}</span>
            <div className="pl-3">
              <CancelIcon className="w-5 h-5 fill-primary-base" />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SelectedUsers;
