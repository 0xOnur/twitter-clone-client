import React from "react";
import MessageActions from "../Actions";
import MessageDate from "../MessageDate";
import { UserState } from "@redux/slices/userSlice";
import classNames from "classnames";
import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { MessageReplyIcon, ReplyIcon } from "@icons/Icon";

interface IProps {
  isMine: boolean;
  message: IMessage;
  conversation: IChat;
  reduxUser: UserState;
}

const ReplyMessage = ({ isMine, message, reduxUser, conversation }: IProps) => {
  const messageStart = classNames("flex", {
    "items-end justify-end": isMine,
    "items-start justify-start": !isMine,
  });

  const messageFlexReverse = classNames("flex w-[87%] group/message", {
    "flex-row justify-end pl-3": isMine,
    "flex-row-reverse justify-end pr-3": !isMine,
  });

  const messageBox = classNames(
    "flex items-start border rounded-3xl box-border max-w-full py-3 px-4",
    {
      "bg-primary-base text-white rounded-br-[4px]": isMine,
      "bg-gray-message rounded-bl-[4px]": !isMine,
    }
  );

  const replyStart = classNames("flex flex-col -mb-7 mt-3 w-full", {
    "items-end": isMine,
  });

  return (
    <div className="w-full">
      <div className="flex flex-col pb-6">
        <div className={messageStart}>
          <div className={messageFlexReverse}>
            <MessageActions isMine={isMine} message={message} />

            <div className="flex flex-col items-start shrink">
              <div className={replyStart}>
                <div className="flex flex-row gap-1 pb-2 items-baseline">
                  <MessageReplyIcon className="w-[10px] h-[10px]" />
                  <span className="text-[11px] leading-3 text-gray-700">
                    Replying to
                  </span>
                </div>
                <div className="flex">
                  <div className="flex flex-row gap-3 mt-0.5 pb-8 pt-3 px-4 rounded-3xl items-end box-border  bg-gray-message">
                    <span className="text-[13px] text-right break-words leading-4">
                      {message.replyTo?.content}
                    </span>
                  </div>
                </div>
              </div>

              <div className={messageBox}>
                <div className="text-left break-words min-w-0 overflow-hidden">
                  <span className="whitespace-pre-line antialiased">
                    {message.content}
                  </span>
                </div>
              </div>
            </div>
            {conversation.isGroupChat && !isMine && (
              <div className="flex flex-row relative items-end">
                <div className="w-52px"></div>
                <div className="absolute left-0">
                  <Avatar
                    avatar={message.sender.avatar!}
                    href={`/${message.sender.username}`}
                    avatarSize="w-10 h-10"
                  />
                </div>
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

export default ReplyMessage;
