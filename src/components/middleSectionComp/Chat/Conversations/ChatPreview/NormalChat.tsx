import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { SelectedIcon, TreeDotIcon, VerifiedIcon } from "@icons/Icon";
import { UserState } from "@redux/slices/userSlice";
import { formatDate } from "@utils/formatDate";
import React, { useState } from "react";
import MoreMenu from "./More";
import { useNavigate } from "react-router-dom";

interface IProps {
  chat: IChat;
  reduxUser: UserState;
  isComposeMode?: boolean;
  selectedUsers?: IUser[];
  setSelectUsers?: React.Dispatch<React.SetStateAction<IUser[]>>;
}

const NormalChat = ({
  chat,
  reduxUser,
  isComposeMode,
  selectedUsers,
  setSelectUsers,
}: IProps) => {
  const navigate = useNavigate();
  const [isOpenMore, setOpenMore] = useState(false);

  const otherParticipant = chat.participants.find(
    (participant) => participant.user._id !== reduxUser.user._id
  );

  const newSelectedUsers = [...(selectedUsers || [])];

  const isAddedUser = newSelectedUsers.some(
    (selectedUser) => selectedUser._id === otherParticipant?.user._id
  );

  const isPinned = chat.participants.find(
    (participant) => participant.user._id === reduxUser.user._id
  )?.isPinned;

  const handleSelect = () => {
    if (isComposeMode) {
      if (!isAddedUser && setSelectUsers && otherParticipant?.user) {
        newSelectedUsers.push(otherParticipant.user);
        setSelectUsers(newSelectedUsers);
      }
    } else {
      navigate(`/messages/${chat._id}`);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleSelect}
        key={chat._id}
        className="grid grid-cols-chat w-full items-start p-4 hover:bg-gray-extraLight duration-200 group"
      >
        <Avatar
          avatar={otherParticipant?.user.avatar!}
          href={`/${otherParticipant?.user.username}`}
        />

        <div className="flex flex-col">
          <div className="grid grid-cols-content items-center gap-2">
            <h2 className="font-bold truncate text-left">
              {otherParticipant?.user.displayName}
            </h2>
            {chat.lastMessage && !isComposeMode && (
              <div className="flex flex-row items-center">
              {otherParticipant?.user.isVerified && (
                <VerifiedIcon className="w-5 h-5 fill-primary-base" />
              )}
              <p className="line-clamp-1 whitespace-nowrap">
                - {formatDate(chat.lastMessage?.updatedAt!)}
              </p>
            </div>
            )}
          </div>
          <p className="line-clamp-1 text-left">{chat.lastMessage?.content}</p>
        </div>

        {!isComposeMode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenMore(!isOpenMore);
            }}
            title="More"
            className="relative h-fit group/item invisible group-hover:visible mr-1 ml-2"
          >
            <TreeDotIcon className="w-5 h-5 z-10" />
            <div className="absolute -z-10 -m-2 group-hover/item:bg-primary-extraLight duration-150 rounded-full top-0 right-0 left-0 bottom-0" />
          </button>
        )}

        {selectedUsers &&
          selectedUsers.some(
            (selectedUser) => selectedUser._id === otherParticipant?.user._id
          ) && (
            <div className="">
              <SelectedIcon className="w-5 h-5 fill-primary-base" />
            </div>
          )}
      </button>

      {isOpenMore && (
        <MoreMenu
          chatId={chat._id}
          isPinned={isPinned || false}
          setOpenMore={setOpenMore}
        />
      )}
    </div>
  );
};

export default NormalChat;
