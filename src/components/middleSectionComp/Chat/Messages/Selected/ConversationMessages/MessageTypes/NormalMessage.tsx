import React from "react";
import MessageActions from "../Actions";
import MessageDate from "../MessageDate";
import classNames from "classnames";
import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { UserState } from "@redux/slices/userSlice";
import MessageMedia from "../MessageMedia";
import MessageContent from "./MessageContent";

interface IProps {
  isMine: boolean;
  message: IMessage;
  conversation: IChat;
  reduxUser: UserState;
}

const NormalMessage = ({
  isMine,
  message,
  reduxUser,
  conversation,
}: IProps) => {
  const messageStart = classNames("flex flex-col gap-1", {
    "items-end justify-end": isMine,
    "items-start justify-start": !isMine,
  });

  const messageFlexReverse = classNames("flex w-[87%] group/message", {
    "flex-row justify-end pl-3": isMine,
    "flex-row-reverse justify-end pr-3": !isMine,
  });

  return (
    <div className="w-full">
      <div className="flex flex-col pb-6">
        <div className={messageStart}>
          <div className={messageFlexReverse}>
            <MessageActions isMine={isMine} message={message} />

            <div className={messageStart}>
              {message?.media && message.media.url && (
                <MessageMedia
                  mediaURL={message.media.url}
                  mediaType={message.media.type}
                />
              )}
              {message.content && message?.content?.length > 0 && (
                <MessageContent isMine={isMine} message={message} />
              )}
            </div>

            {conversation.isGroupChat && !isMine && (
              <div className="flex flex-row relative items-end">
                <Avatar
                  avatar={message.sender?.avatar!}
                  href={`/${message.sender?.username}`}
                  avatarSize="w-10 h-10"
                />
              </div>
            )}
          </div>
        </div>

        <MessageDate
          key={message._id}
          isMine={isMine}
          message={message}
          reduxUser={reduxUser}
          conversation={conversation}
        />
      </div>
    </div>
  );
};

export default NormalMessage;
