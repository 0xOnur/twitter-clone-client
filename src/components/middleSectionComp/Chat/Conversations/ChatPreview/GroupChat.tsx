import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import AvatarGroup from "@atlaskit/avatar-group";
import { formatDate } from "@utils/formatDate";
import { TreeDotIcon } from "@icons/Icon";
import { useState } from "react";
import MoreMenu from "./More";
import { UserState } from "@redux/slices/userSlice";

interface IProps {
  chat: IChat;
  reduxUser: UserState;
}

const GroupChat = ({ chat, reduxUser }: IProps) => {
  const [isOpenMore, setOpenMore] = useState(false);

  const participantsAvatars = chat.participants
    .filter((participant) => !participant.hasLeft)
    .slice(0, 4)
    .map((participant) => ({
      src: participant.user.avatar || "",
      name: participant.user.displayName,
      href: `/${participant.user.username}`,
    }));

  const participantsDisplayNames = chat.participants
    .filter((participant) => !participant.hasLeft)
    .slice(0, 2)
    .map((participant) => {
      return participant.user.displayName;
    });
  
  const isPinned = chat.participants.find(
    (participant) => participant.user._id === reduxUser.user._id
  )?.isPinned;


  return (
    <div className="relative">
      <a
        href={`/messages/${chat._id}`}
        key={chat._id}
        className="flex w-full group p-4 hover:bg-gray-extraLight duration-200"
      >
        <div className="flex flex-row w-full">
          <div onClick={(e) => e.preventDefault()}>
            {chat.chatImage ? (
              <Avatar avatar={chat.chatImage} />
            ) : (
              <div className="mr-3">
                <AvatarGroup
                  appearance="stack"
                  maxCount={1}
                  size="large"
                  data={participantsAvatars}
                />
              </div>
            )}
          </div>
          <div className="flex-flex-row w-full">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2 w-fit">
                  <div className="flex flex-row md:max-w-[120px]  overflow-hidden">
                    {chat.chatName ? (
                      <div>
                        <p className="font-bold truncate max-w-[200px]">
                          {chat.chatName}
                        </p>
                      </div>
                    ) : (
                      <>
                        <p className="font-bold truncate max-w-[200px]">
                          {participantsDisplayNames.join(", ")}
                        </p>
                        <p className="line-clamp-1 whitespace-nowrap hidden lg:hidden md:hidden sm:block">
                          and more
                        </p>
                      </>
                    )}
                  </div>
                  <div>
                    <p>- {formatDate(chat.lastMessage?.updatedAt!)}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenMore(!isOpenMore);
                  }}
                  title="More"
                  className="relative h-fit group/item invisible group-hover:visible mr-1"
                >
                  <TreeDotIcon className="w-5 h-5 z-10" />
                  <div className="absolute -z-10 -m-2 group-hover/item:bg-primary-extraLight duration-150 rounded-full top-0 right-0 left-0 bottom-0"></div>
                </button>
              </div>

              <span className="line-clamp-1">{chat.lastMessage?.content}</span>
            </div>
          </div>
        </div>
      </a>
      {isOpenMore && (
        <MoreMenu
          chatId={chat._id}
          isPinned={isPinned ||false}
          setOpenMore={setOpenMore}
        />
      )}
    </div>
  );
};

export default GroupChat;
