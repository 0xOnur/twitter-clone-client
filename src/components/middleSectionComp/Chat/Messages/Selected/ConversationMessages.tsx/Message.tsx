import { Avatar } from "@components/middleSectionComp/TweetCard/components";
import { formatDetailedDate } from "@utils/formatDetailedDate";
import { LikePlusIcon, TreeDotIcon } from "@icons/Icon";
import classNames from "classnames";

interface IProps {
  message: IMessage;
  isGroupChat: boolean;
  isMine: boolean;
}

const Message = ({ isGroupChat, isMine, message }: IProps) => {
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

  const messageActionBox = classNames(
    "flex flex-row self-center opacity-0 group-hover/message:opacity-100",
    {
      "justify-end pr-1": isMine,
      "justify-start pl-1": !isMine,
    }
  );

  const messageDate = classNames("flex mt-[6px] w-[87%] overflow-hidden", {
    "self-end justify-end": isMine,
  });

  return (
    <div className="w-full">
      <div className="flex flex-col pb-6">
        <div className={messageStart}>
          <div className={messageFlexReverse}>
            <div className={messageActionBox}>
              <button>
                <div className="flex justify-center min-w-[36px] min-h-[36px] hover:bg-primary-extraLight duration-200 rounded-full">
                  <div className="flex grow font-bold text-center items-center justify-center">
                    <LikePlusIcon className="w-5 h-5" />
                  </div>
                </div>
              </button>
              <button>
                <div className="flex justify-center min-w-[36px] min-h-[36px] hover:bg-primary-extraLight duration-200 rounded-full">
                  <div className="flex grow font-bold text-center items-center justify-center">
                    <TreeDotIcon className="w-5 h-5" />
                  </div>
                </div>
              </button>
            </div>
            <div className="flex items-start shrink">
              <div className={messageBox}>
                <div className="text-left break-words min-w-0 overflow-hidden">
                  <span className="whitespace-pre-line antialiased">
                    {message.content}
                  </span>
                </div>
              </div>
            </div>
            {isGroupChat && !isMine && (
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

        <div className={messageDate}>
          <span className="text-gray-dark leading-4 text-[13px] break-words">
            <time dateTime={message.createdAt}>
              {formatDetailedDate(message.createdAt)}
            </time>
          </span>
        </div>
      </div>
    </div>
  );

  return <div>Message</div>;
};

export default Message;
