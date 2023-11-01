import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { CancelIcon } from "@icons/Icon";
import React from "react";

interface IProps {
  selectedUsers: IUser[];
  setSelectUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}

const SelectedUsers = ({ selectedUsers, setSelectUsers }: IProps) => {
  const handleRemove = (user: IUser) => {
    return () => {
      const newSelectedUsers = selectedUsers.filter(
        (selectedUser) => selectedUser._id !== user._id
      );
      setSelectUsers(newSelectedUsers);
    };
  };
  return (
    <div className="flex flex-row flex-wrap p-1 border-b-2 border-[color:var(--background-third)] bg-[color:var(--background-primary)]">
      {selectedUsers.map((user) => (
        <button
          key={user._id}
          onClick={handleRemove(user)}
          className="min-h-[32px] max-w-[90%] m-1 border border-[color:var(--color-primary)] rounded-full overflow-hidden"
        >
          <div className="flex relative group h-full items-center">
            <div className="absolute w-full h-full group-hover:bg-[color:var(--color-secondary)] opacity-[0.12] duration-200" />
            <div className="flex flex-row pr-3 items-center pl-1">
              <Avatar avatar={user.avatar!} avatarSize="w-6 h-6" />
              <span className="font-bold truncate">{user.displayName}</span>
              <div className="pl-3">
                <CancelIcon className="w-5 h-5 text-[color:var(--color-primary)]" />
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SelectedUsers;
