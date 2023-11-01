import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { TreeDotIcon, VerifiedIcon } from "@icons/Icon";
import { UserState } from "@redux/slices/userSlice";
import { formatDate } from "@utils/formatDate";
import React, { useState } from "react";
import MoreMenu from "./More";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import LastMessageInfo from "./LastMessageInfo";
import LastMessageNotif from "./LastMessageNotif";

interface IProps {
  chat: IChat;
  reduxUser: UserState;
  isSelectedChat?: boolean;
}

const NormalChat = ({ chat, reduxUser, isSelectedChat }: IProps) => {
  const navigate = useNavigate();
  const [isOpenMore, setOpenMore] = useState(false);

  const otherParticipant = chat.participants.find(
    (participant) => participant.user._id !== reduxUser.user?._id
  );

  const isPinned = chat.participants.find(
    (participant) => participant.user._id === reduxUser.user?._id
  )?.isPinned;

  const isLastMessageByMe =
    chat.lastMessage?.sender?._id === reduxUser.user?._id;

  const isReadByMe =
    chat.lastMessage?.readBy?.includes(reduxUser.user?._id!) ||
    isLastMessageByMe;

  const chatClassNames = classNames(
    "grid grid-cols-chat w-full items-start p-4 duration-200 group",
    {
      "hover:bg-[color:var(--background-secondary)]": !isSelectedChat,
      "bg-[color:var(--background-third)] hover:bg-[color:var(--background-secondary)]": isSelectedChat,
    }
  );

  return (
    <div className="relative">
      <button
        onClick={() => {
          navigate(`/messages/${chat._id}`);
        }}
        className={chatClassNames}
      >
        <Avatar
          avatar={otherParticipant?.user.avatar!}
          href={`/${otherParticipant?.user.username}`}
        />

        <div className="grid">
          <div className="grid grid-cols-content items-center gap-2">
            <h2 className="font-bold truncate text-left">
              {otherParticipant?.user.displayName}
            </h2>
            {chat.lastMessage && (
              <div className="flex flex-row items-center">
                {otherParticipant?.user.isVerified && (
                  <VerifiedIcon className="w-5 h-5 text-[color:var(--color-primary)]" />
                )}
                <p className="line-clamp-1 whitespace-nowrap text-[color:var(--color-base-secondary)]">
                  - {formatDate(chat.lastMessage?.createdAt!)}
                </p>
              </div>
            )}
          </div>
          <LastMessageInfo
            chat={chat}
            reduxUser={reduxUser}
            isReadByMe={isReadByMe}
            isLastMessageByMe={isLastMessageByMe}
          />
        </div>

        {!isReadByMe && <LastMessageNotif />}

        <div
          onClick={(e) => {
            e.stopPropagation();
            setOpenMore(!isOpenMore);
          }}
          title="More"
          className="relative h-fit mr-1 ml-2 group/item hidden group-hover:block"
        >
          <TreeDotIcon className="w-5 h-5 z-10 text-[color:var(--color-base-secondary)] group-hover/item:text-blue-base" />
          <div className="absolute inset-0 -m-2 group-hover/item:bg-blue-base/10 duration-150 rounded-full" />
        </div>
      </button>

      {isOpenMore && (
        <MoreMenu
          chatId={chat._id}
          isPinned={isPinned || false}
          setOpenMore={setOpenMore}
        />
      )}

      {isSelectedChat && (
        <div className="absolute top-0 right-0 bottom-0 w-0.5 bg-[color:var(--color-primary)]" />
      )}
    </div>
  );
};

export default NormalChat;
