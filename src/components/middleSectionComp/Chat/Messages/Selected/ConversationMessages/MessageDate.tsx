import { UserState } from "@redux/slices/userSlice";
import { formatDetailedDate } from "@utils/formatDetailedDate";
import classNames from "classnames";
import GroupMessageSeen from "./GroupMessageSeen";

interface IProps {
  conversation: IChat;
  isMine: boolean;
  message: IMessage;
  reduxUser: UserState;
}

const MessageDate = ({ isMine, message, reduxUser, conversation }: IProps) => {
  const messageDateClassName = classNames("flex mt-[6px] max-w-[87%]", {
    "self-end justify-end": isMine,
  });

  const otherParticipants = conversation.participants.find(
    (participant) => participant.user._id !== reduxUser.user._id
  );

  return (
    <div className={messageDateClassName}>
      <div className="flex flex-row gap-1 text-gray-dark text-[13px] leading-4">
        <span>
          <time dateTime={message.createdAt}>
            {formatDetailedDate(message.createdAt!)}
          </time>
        </span>

        {isMine && (
          <>
            {conversation.isGroupChat ? (
              <GroupMessageSeen
                message={message}
                conversation={conversation}
                reduxUser={reduxUser}
              />
            ) : (
              <span>
                {message.readBy?.find(
                  (user) => user._id === otherParticipants?.user._id
                ) ? (
                  <span>· Seen</span>
                ) : (
                  <span>· Sent</span>
                )}
              </span>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MessageDate;
