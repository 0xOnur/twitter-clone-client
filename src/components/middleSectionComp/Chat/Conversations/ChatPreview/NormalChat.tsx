import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { TreeDotIcon, VerifiedIcon } from "@icons/Icon";
import { UserState } from "@redux/slices/userSlice";
import { formatDate } from "@utils/formatDate";
import React, { useState } from "react";
import MoreMenu from "./More";

interface IProps {
  chat: IChat;
  reduxUser: UserState;
}

const NormalChat = ({ chat, reduxUser }: IProps) => {
  const [isOpenMore, setOpenMore] = useState(false);

  const ChatParticipants = chat.participants.find(
    (participants) => participants.user._id !== reduxUser.user._id
  );

  //check isPinned in chat participant
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
          <Avatar
            avatar={ChatParticipants?.user.avatar!}
            href={`/${ChatParticipants?.user.username}`}
          />
          <div className="flex-flex-row w-full ">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <div className="flex flex-row gap-2 w-fit ">
                  <div className="md:max-w-[120px] overflow-hidden">
                    <div className="flex flex-row">
                      <p className="font-bold truncate max-w-[200px]">
                        {ChatParticipants?.user.displayName}
                      </p>
                      <p>
                        {ChatParticipants?.user.isVerified && (
                          <VerifiedIcon className="w-5 h-5 fill-primary-base" />
                        )}
                      </p>
                    </div>
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
          isPinned={isPinned || false}
          setOpenMore={setOpenMore}
        />
      )}
    </div>
  );
};

export default NormalChat;
