import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { formatDate } from "@utils/formatDate";
import { TreeDotIcon } from "@icons/Icon";
import { useNavigate } from "react-router-dom";
import { UserState } from "@redux/slices/userSlice";
import { useState } from "react";
import AvatarGroup from "@atlaskit/avatar-group";
import classNames from "classnames";
import MoreMenu from "./More";

interface IProps {
  chat: IChat;
  reduxUser: UserState;
  isSelectedChat?: boolean;
}

const GroupChat = ({ chat, reduxUser, isSelectedChat }: IProps) => {
  const navigate = useNavigate();
  const [isOpenMore, setOpenMore] = useState(false);

  const participantsAvatars = chat.participants.map((participant) => ({
    src: participant.user.avatar || "",
    name: participant.user.displayName,
    href: `/${participant.user.username}`,
  }));

  const participantsDisplayNames = chat.participants
    .slice(0, 2)
    .map((participant) => {
      return participant.user._id === reduxUser.user._id
        ? "You"
        : participant.user.displayName;
    });

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
      <button
        key={chat._id}
        className={chatClassNames}
        onClick={() => {
          navigate(`/messages/${chat._id}`);
        }}
      >
        <div onClick={(e) => e.stopPropagation()}>
          {chat.chatImage ? (
            <Avatar avatar={chat.chatImage} href={`/messages/${chat._id}`} />
          ) : (
            <div className="mr-3">
              <AvatarGroup
                appearance="stack"
                maxCount={2}
                size="large"
                data={participantsAvatars}
              />
            </div>
          )}
        </div>

        <div className="grid">
          <div className="grid grid-cols-content items-center gap-2">
            {chat.chatName ? (
              <h2 className="font-bold truncate text-left">{chat.chatName}</h2>
            ) : (
              <div className="flex gap-2 truncate">
                <span className="font-bold truncate text-left">
                  {participantsDisplayNames.join(", ")}
                </span>
                {chat.participants.length > 2 && (
                  <span className="font-bold text-left">
                    and {chat.participants.length - 2} more
                  </span>
                )}
              </div>
            )}
            {chat.lastMessage && (
              <div className="flex flex-row items-center">
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

export default GroupChat;
