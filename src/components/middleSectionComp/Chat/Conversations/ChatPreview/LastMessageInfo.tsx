import { UserState } from "@redux/slices/userSlice";
import classNames from "classnames";
import React from "react";

interface IProps {
  chat: IChat;
  isReadByMe: boolean;
  isLastMessageByMe:boolean
  reduxUser: UserState;
}

const LastMessageInfo = ({ chat, reduxUser, isReadByMe, isLastMessageByMe }: IProps) => {

  const lastMessageClassNames = classNames("truncate text-left", {
    "font-bold": !isReadByMe,
    "text-[color:var(--color-base-secondary)]": isReadByMe,
  });

  return (
    <div>
      {chat.lastMessage?.type === "tweet" ? (
        <div className="grid">
          {chat.lastMessage.sender?._id === reduxUser.user?._id ? (
            <p className={lastMessageClassNames}>You shared a post</p>
          ) : (
            <p className={lastMessageClassNames}>Shared a post</p>
          )}
        </div>
      ) : (
        <div className="grid">
          <p className={lastMessageClassNames}>
            {chat.lastMessage?.content
              ? chat.lastMessage.content
              : chat.lastMessage?.media && (
                  <>
                    {isLastMessageByMe
                      ? `You sent ${chat.lastMessage.media.type}`
                      : `Sent a ${chat.lastMessage.media.type}`}
                  </>
                )}
          </p>
        </div>
      )}
    </div>
  );
};

export default LastMessageInfo;
