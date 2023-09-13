import { selectReplyMessage, clearReplyMessage } from "@redux/slices/chatSlice";
import { useSelector, useDispatch } from "react-redux";
import { CancelIcon } from "@icons/Icon";

const ReplyingMessage = () => {
  const dispatch = useDispatch();
  const replyMessage = useSelector(selectReplyMessage);

  if (!replyMessage) return null;

  return (
    <div className="flex flex-row gap-1 items-center justify-between w-full py-2 px-3 bg-gray-message border-l-4 border-x-gray-700">
      <div className="flex flex-col shrink">
        <span className="text-sm text-gray-700 font-medium leading-4">
          {replyMessage?.sender?.displayName}
        </span>
        <div className="grid">
          <span className="truncate text-[13px] font-normal leading-4">
            {replyMessage?.content}
          </span>
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
