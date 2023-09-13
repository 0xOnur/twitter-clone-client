import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { SelectedIcon, VerifiedIcon } from "@icons/Icon";
import { UserState } from "@redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import React from "react";
import classNames from "classnames";

interface IProps {
  chat: IChat;
  reduxUser: UserState;
  selectedUsers: IUser[];
  setSelectUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}

const NormalPreview = ({
  chat,
  reduxUser,
  selectedUsers,
  setSelectUsers,
}: IProps) => {
  const navigate = useNavigate();

  const otherParticipant = chat.participants.find(
    (participant) => participant.user._id !== reduxUser.user._id
  );

  const newSelectedUsers = [...(selectedUsers || [])];

  const isAddedUser = newSelectedUsers.some(
    (selectedUser) => selectedUser._id === otherParticipant?.user._id
  );

  const handleSelect = () => {
    if (!chat.isGroupChat) {
      if (!isAddedUser && setSelectUsers && otherParticipant?.user) {
        newSelectedUsers.push(otherParticipant.user);
        setSelectUsers(newSelectedUsers);
      }
    } else {
      navigate(`/messages/${chat._id}`);
    }
  };

  const chatClassNames = classNames(
    "grid grid-cols-chat w-full items-start p-4 hover:bg-gray-extraLight duration-200 group",
    {
      "cursor-not-allowed": isAddedUser,
    }
  );

  return (
    <div className="relative">
      <button
        onClick={handleSelect}
        key={chat._id}
        className={chatClassNames}
      >
        <Avatar
          avatar={otherParticipant?.user.avatar!}
          href={`/${otherParticipant?.user.username}`}
        />

        <div className="flex flex-col">
          <div className="grid grid-cols-content items-center gap-2">
            <h2 className="flex gap-1 items-center font-bold truncate text-left">
              {otherParticipant?.user.displayName}
              {otherParticipant?.user.isVerified && (
                <VerifiedIcon className="w-5 h-5 text-primary-base" />
              )}
            </h2>
          </div>
          <p className="line-clamp-1 text-left">@{otherParticipant?.user.username}</p>
        </div>

        {selectedUsers &&
          selectedUsers.some(
            (selectedUser) => selectedUser._id === otherParticipant?.user._id
          ) && (
            <div className="">
              <SelectedIcon className="w-5 h-5 fill-primary-base" />
            </div>
          )}
      </button>
    </div>
  );
};

export default NormalPreview;
