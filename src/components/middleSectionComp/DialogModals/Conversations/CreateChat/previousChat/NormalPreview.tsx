import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { SelectedIcon, VerifiedIcon } from "@icons/Icon";
import { UserState } from "@redux/slices/userSlice";
import classNames from "classnames";
import React from "react";

interface IProps {
  chat: IChat;
  addPeopleChat?: IChat;
  reduxUser: UserState;
  isAddPeopleMode?: boolean;
  selectedUsers: IUser[];
  setSelectUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}

const NormalPreview = ({
  chat,
  reduxUser,
  addPeopleChat,
  isAddPeopleMode,
  selectedUsers,
  setSelectUsers,
}: IProps) => {
  const otherParticipant = chat.participants.find(
    (participant) => participant.user._id !== reduxUser.user?._id
  );

  const newSelectedUsers = [...(selectedUsers || [])];

  const isAddedUser = newSelectedUsers.some(
    (selectedUser) => selectedUser._id === otherParticipant?.user._id
  );

  const peopleChatMembers = addPeopleChat?.participants
    .filter((participant) => participant.user._id !== reduxUser.user?._id)
    .map((user) => user.user._id);

  const isMemberGroup = peopleChatMembers?.includes(
    otherParticipant?.user._id!
  );

  const handleSelect = () => {
    if (
      isAddPeopleMode &&
      !isAddedUser &&
      !isMemberGroup &&
      otherParticipant?.user
    ) {
      newSelectedUsers.push(otherParticipant.user);
      setSelectUsers(newSelectedUsers);
    }
    if (
      !isAddPeopleMode &&
      !isAddedUser &&
      setSelectUsers &&
      otherParticipant?.user
    ) {
      newSelectedUsers.push(otherParticipant.user);
      setSelectUsers(newSelectedUsers);
    }
  };

  const chatClassNames = classNames(
    "grid grid-cols-chat w-full items-start p-4 hover:bg-[color:var(--background-secondary)] duration-200 group",
    {
      "cursor-not-allowed opacity-50": isAddedUser || isMemberGroup,
    }
  );

  return (
    <div className="relative">
      <button key={chat._id} onClick={handleSelect} className={chatClassNames}>
        <Avatar
          avatar={otherParticipant?.user.avatar!}
          href={`/${otherParticipant?.user.username}`}
        />

        <div className="flex flex-col">
          <div className="grid grid-cols-content items-center gap-2">
            <div className="flex gap-2 truncate">
              <span className="font-bold truncate text-left">
                {otherParticipant?.user.displayName}
              </span>
              {otherParticipant?.user.isVerified && (
                <span className="font-bold text-left">
                  <VerifiedIcon className="w-5 h-5 text-[color:var(--color-primary)]" />
                </span>
              )}
            </div>
          </div>
          <p className="line-clamp-1 text-left">
            @{otherParticipant?.user.username}
          </p>
        </div>

        {(isAddedUser || isMemberGroup) && (
          <div>
            <SelectedIcon className="w-5 h-5 text-[color:var(--color-primary)]" />
          </div>
        )}
      </button>
    </div>
  );
};

export default NormalPreview;
