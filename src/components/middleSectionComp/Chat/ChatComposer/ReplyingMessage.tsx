import { clearReplyMessage } from "@redux/slices/chatSlice";
import { useDispatch } from "react-redux";
import { CancelIcon, UploadImageIcon } from "@icons/Icon";

interface IProps {
  replyMessage?: IMessage;
}

const ReplyingMessage = ({replyMessage}: IProps) => {
  const dispatch = useDispatch();

  if (!replyMessage) return null;
  console.log(
    "🚀 ~ file: ReplyingMessage.tsx:10 ~ ReplyingMessage ~ replyMessage:",
    replyMessage
  );

  const tweetURL =
    window.location.origin +
    `/${replyMessage?.tweet?.author.username}/status/${replyMessage?.tweet?._id}`;

  return (
    <div className="flex flex-row gap-1 items-center justify-between w-full py-2 px-3 bg-gray-message border-l-4 border-x-gray-700">
      <div className="flex flex-col gap-1 shrink">
        <span className="text-sm font-medium leading-4">
          {replyMessage?.sender?.displayName}
        </span>
        <div className="grid">
          {!replyMessage.content && replyMessage.media?.url && (
            <div className="flex flex-row gap-1 items-center">
              <UploadImageIcon className="w-5 h-5" />
              <span className="truncate capitalize text-[13px] font-normal leading-4">
                {replyMessage.media.type}
              </span>
            </div>
          )}
          {replyMessage.content && (
            <span className="truncate text-[13px] font-normal leading-4">
              {replyMessage.content}
            </span>
          )}
          {replyMessage.tweet && (
            <span className="truncate text-[13px] font-normal leading-4">
              {tweetURL}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-row h-full items-center">
        <button
          onClick={() => dispatch(clearReplyMessage())}
          className="flex items-center min-w-[36px] min-h-[36px] rounded-full hover:bg-gray-extraLight duration-200"
        >
          <div className="flex grow justify-center">
            <CancelIcon className="w-5 h-5 fill-gray-700" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ReplyingMessage;
