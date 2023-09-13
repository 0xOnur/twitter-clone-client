import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { TreeDotIcon, VerifiedIcon } from "@icons/Icon";
import { UserState } from "@redux/slices/userSlice";
import { formatDate } from "@utils/formatDate";
import React, { useState } from "react";
import MoreMenu from "./More";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

interface IProps {
  chat: IChat;
  reduxUser: UserState;
  isSelectedChat?: boolean;
}

const NormalChat = ({
  chat,
  reduxUser,
  isSelectedChat,
}: IProps) => {
  const navigate = useNavigate();
  const [isOpenMore, setOpenMore] = useState(false);

  const otherParticipant = chat.participants.find(
    (participant) => participant.user._id !== reduxUser.user._id
  );


  const isPinned = chat.participants.find(
    (participant) => participant.user._id === reduxUser.user._id
  )?.isPinned;


  const chatClassNames = classNames(
    "grid grid-cols-chat w-full items-start p-4 duration-200 group",
    {
      "hover:bg-gray-extraLight": !isSelectedChat,
      "bg-gray-message hover:bg-gray-extraLight": isSelectedChat,
    }
  );

  return (
    <div className="relative">
      <button onClick={
        () => {
          navigate(`/messages/${chat._id}`);
        }
      } key={chat._id} className={chatClassNames}>
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
                  <VerifiedIcon className="w-5 h-5 fill-primary-base" />
                )}
                <p className="line-clamp-1 whitespace-nowrap">
                  - {formatDate(chat.lastMessage?.updatedAt!)}
                </p>
              </div>
            )}
          </div>
          {chat.lastMessage?.content && (
            <div className="truncate">
              <p className="truncate text-left">
                {chat.lastMessage.content}
              </p>
            </div>
          )}
        </div>

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
      </button>

      {isOpenMore && (
        <MoreMenu
          chatId={chat._id}
          isPinned={isPinned || false}
          setOpenMore={setOpenMore}
        />
      )}

      {isSelectedChat && (
        <div className="absolute top-0 right-0 bottom-0 w-0.5 bg-primary-base" />
      )}
    </div>
  );
};

export default NormalChat;
