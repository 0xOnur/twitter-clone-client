import { clearReplyMessage } from "@redux/slices/chatComposerSlice";
import { useDispatch } from "react-redux";
import { CancelIcon, UploadImageIcon } from "@icons/Icon";

interface IProps {
  replyMessage?: IMessage;
}

const ReplyingMessage = ({replyMessage}: IProps) => {
  const dispatch = useDispatch();

  if (!replyMessage) return null;

  const tweetURL =
    window.location.origin +
    `/${replyMessage?.tweet?.author.username}/status/${replyMessage?.tweet?._id}`;

  return (
    <div className="flex flex-row gap-1 items-center justify-between w-full py-2 px-3 bg-[color:var(--background-secondary)] border-l-4 border-[color:var(--color-primary)]">
      <div className="flex flex-col gap-1 shrink">
        <span className="text-sm font-semibold leading-4">
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
          className="flex items-center min-w-[36px] min-h-[36px] rounded-full hover:bg-[color:var(--background-third)] duration-200"
        >
          <div className="flex grow justify-center">
            <CancelIcon className="w-5 h-5 text-[color:var(--color-base-secondary)]" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ReplyingMessage;
