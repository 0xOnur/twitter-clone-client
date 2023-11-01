import { setReplyMessage } from "@redux/slices/chatComposerSlice";
import { MessageReplyIcon } from "@icons/Icon";
import { useDispatch } from "react-redux";

interface IProps {
  message: IMessage;
  setOpenMore: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReplyMessage = ({ message, setOpenMore }: IProps) => {
    const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(setReplyMessage(message));
        setOpenMore(false);
      }}
      className="flex flex-row items-center w-full py-3 px-4 hover:bg-[color:var(--background-secondary)] duration-200"
    >
      <div className="flex pr-3 justify-center">
        <MessageReplyIcon className="w-5 h-5" />
      </div>
      <span className="font-bold">Reply</span>
    </button>
  );
};

export default ReplyMessage;
