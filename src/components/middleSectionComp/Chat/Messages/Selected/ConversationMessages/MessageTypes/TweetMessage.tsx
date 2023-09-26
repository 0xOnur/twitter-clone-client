import {
  Avatar,
  TweetMedia,
} from "@components/middleSectionComp/TweetCard/components";
import { UserState } from "@redux/slices/userSlice";
import MessageDate from "../MessageDate";
import MessageActions from "../Actions";
import classNames from "classnames";
import useGetTweet from "@hooks/Tweet/Queries/useGetTweet";
import { VerifiedIcon } from "@icons/Icon";
import { formatDate } from "@utils/formatDate";
import { useNavigate } from "react-router-dom";

interface IProps {
  isMine: boolean;
  message: IMessage;
  conversation: IChat;
  reduxUser: UserState;
}

const TweetMessage = ({ isMine, message, reduxUser, conversation }: IProps) => {
  const navigate = useNavigate();
  const { tweet, status } = useGetTweet({ tweetId: message.tweet._id });

  const messageStart = classNames("flex flex-col", {
    "items-end justify-end": isMine,
    "items-start justify-start": !isMine,
  });

  const messageFlexReverse = classNames("flex w-[87%] group/message", {
    "flex-row justify-end pl-3": isMine,
    "flex-row-reverse justify-end pr-3": !isMine,
  });

  const messageBox = classNames(
    "grid items-start border rounded-3xl box-border max-w-full py-3 px-4 mt-1",
    {
      "bg-primary-base text-white rounded-br-[4px]": isMine,
      "bg-gray-message rounded-bl-[4px]": !isMine,
    }
  );
  return (
    <div className="w-full">
      <div className="flex flex-col pb-6">
        <div className={messageStart}>
          <div className={messageFlexReverse}>
            <MessageActions isMine={isMine} message={message} />

            <div className={messageStart}>
              {status === "loading" && (
                <div className="flex flex-row items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-base"></div>
                </div>
              )}

              {status === "error" && (
                <div className="flex flex-row items-center justify-center">
                  <div className="text-red-500">
                    <span className="">Tweet not found</span>
                  </div>
                </div>
              )}

              {status === "success" && (
                <button
                  onClick={() => {
                    navigate(`/${tweet?.author.username}/status/${tweet?._id}`);
                  }}
                  className="flex flex-col text-left border-2 shadow rounded-2xl overflow-hidden hover:bg-gray-tweetHover"
                >
                  <div className="flex flex-col">
                    {/* tweet header */}
                    <div className="flex flex-col mt-3 mx-3">
                      <div className="flex flex-row items-center shrink">
                        <Avatar
                          avatar={tweet?.author.avatar!}
                          href={`/${tweet?.author.username}`}
                          avatarSize="w-5 h-5"
                        />

                        <div className="flex flex-row items-center">
                          <div className="grid grid-cols-chat items-center">
                            <span className="truncate text-[15px] leading-5 font-bold">
                              {tweet?.author.displayName}
                            </span>
                            {tweet?.author.isVerified && (
                              <span>
                                <VerifiedIcon className="w-5 h-5 mt-1 ml-1 fill-primary-base" />
                              </span>
                            )}
                          </div>

                          <div className="grid grid-cols-chat gap-1 ml-1">
                            <span className="truncate">
                              @{tweet?.author.username}
                            </span>
                            <span>·</span>
                            <span className="line-clamp-1">
                              {formatDate(tweet?.createdAt!)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* tweet content */}
                    {tweet?.content && (
                      <div className="flex flex-col mb-3 mx-3">
                        <div className="mt-1">{tweet?.content}</div>
                      </div>
                    )}

                    {/* tweet media */}
                    {tweet?.media && tweet.media.length > 0 && (
                      <div className="flex flex-col mt-1 -mb-2">
                        <TweetMedia tweet={tweet} />
                      </div>
                    )}
                  </div>
                </button>
              )}

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
