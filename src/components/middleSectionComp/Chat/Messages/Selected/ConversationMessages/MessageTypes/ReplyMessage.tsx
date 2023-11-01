import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { UserState } from "@redux/slices/userSlice";
import { MessageReplyIcon } from "@icons/Icon";
import MessageActions from "../Actions";
import MessageDate from "../MessageDate";
import classNames from "classnames";
import MessageTweetCard from "./TweetCard";
import MessageMedia from "../MessageMedia";

interface IProps {
  isMine: boolean;
  message: IMessage;
  conversation: IChat;
  reduxUser: UserState;
}

const ReplyMessage = ({ isMine, message, reduxUser, conversation }: IProps) => {
  const messageStart = classNames("flex flex-col gap-1 w-full", {
    "items-end justify-end": isMine,
    "items-start justify-start": !isMine,
  });

  const messageFlexReverse = classNames("flex max-w-[87%] group/message", {
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

  const replyStart = classNames("flex flex-col -mb-7 pb- mt-3 w-full", {
    "items-end": isMine,
  });

  const replyImagePaddig = classNames({
    "mb-7": message.replyTo?.media && !message.replyTo?.content,
  });

  return (
    <div className="w-full">
      <div className="flex flex-col pb-6">
        <div className={messageStart}>
          <div className={messageFlexReverse}>
            <MessageActions isMine={isMine} message={message} />

            <div className={messageStart}>
              <div className={replyStart}>
                <div className="flex flex-row gap-1 pb-2 items-baseline text-[color:var(--color-base-secondary)]">
                  <MessageReplyIcon className="w-[10px] h-[10px]" />
                  <span className="text-[11px] leading-3">
                    Replying to
                  </span>
                </div>

                <div className={messageStart}>
                  {message.replyTo?.type === "tweet" && (
                    <MessageTweetCard tweetId={message.replyTo.tweet} />
                  )}

                  <div className={replyImagePaddig}>
                    {message.replyTo?.media && message.replyTo?.media.url && (
                      <MessageMedia
                        mediaURL={message.replyTo.media.url}
                        mediaType={message.replyTo.media.type}
                        imageSize="max-w-[100px]"
                        videoSize="max-w-[200px]"
                      />
                    )}
                  </div>

                  {message.replyTo?.content && (
                    <div className="grid mt-0.5 pb-8 pt-3 px-4 rounded-3xl bg-[color:var(--background-secondary)]">
                      <span className="text-[13px] whitespace-pre-line break-words min-w-0 leading-4 text-[color:var(--color-base-secondary)]">
                        {message.replyTo?.content}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className={messageStart}>
                {message?.media && message.media.url && (
                  <MessageMedia
                    mediaURL={message.media.url}
                    mediaType={message.media.type}
                  />
                )}
                {message.content && message?.content?.length > 0 && (
                  <div className={messageBox}>
                    <div className="break-words min-w-0 overflow-hidden">
                      <span className="whitespace-pre-line antialiased">
                        {message.content}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {conversation.isGroupChat && !isMine && (
              <div className="flex flex-row relative items-end">
                <div className="w-52px"></div>
                <div className="absolute left-0">
                  <Avatar
                    avatar={message.sender?.avatar!}
                    href={`/${message.sender?.username}`}
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
