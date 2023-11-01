import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { UserState } from "@redux/slices/userSlice";
import MessageDate from "../MessageDate";
import MessageActions from "../Actions";
import classNames from "classnames";
import MessageTweetCard from "./TweetCard";

interface IProps {
  isMine: boolean;
  message: IMessage;
  conversation: IChat;
  reduxUser: UserState;
}

const TweetMessage = ({ isMine, message, reduxUser, conversation }: IProps) => {
  const messageStart = classNames("flex flex-col", {
    "items-end justify-end": isMine,
    "items-start justify-start": !isMine,
  });

  const messageFlexReverse = classNames("flex w-[87%] group/message", {
    "flex-row justify-end pl-3": isMine,
    "flex-row-reverse justify-end pr-3": !isMine,
  });

  const messageBox = classNames(
    "grid items-start rounded-3xl box-border max-w-full py-3 px-4",
    {
      "bg-[color:var(--color-primary)] text-white rounded-br-[4px]": isMine,
      "bg-[color:var(--background-third)] rounded-bl-[4px]": !isMine,
    }
  );
  return (
    <div className="w-full">
      <div className="flex flex-col pb-6">
        <div className={messageStart}>
          <div className={messageFlexReverse}>
            <MessageActions isMine={isMine} message={message} />

            <div className={messageStart}>
              <MessageTweetCard tweetId={message.tweet._id} />

              {message.content && message.content.length > 0 && (
                <div className={messageBox}>
                  <div className="break-words min-w-0 overflow-hidden">
                    <span className="whitespace-pre-line antialiased">
                      {message.content}
                    </span>
                  </div>
                </div>
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

export default TweetMessage;
