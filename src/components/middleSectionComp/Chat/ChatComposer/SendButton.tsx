import { SendIcon } from "@icons/Icon";
import classNames from "classnames";

interface IProps {
  messageContent: string;
  handleSentMessage: () => void
}

const SendButton = ({ messageContent, handleSentMessage }: IProps) => {
  const isMessageReady = messageContent.trim().length > 0;

  const buttonClass = classNames(
    "flex ml-1 items-center min-h-[36px] min-w-[36px] rounded-full duration-200",
    {
      "opacity-50": !isMessageReady,
      "hover:bg-primary-hover": isMessageReady,
    }
  );

  return (
    <button
      type="submit"
      disabled={!isMessageReady}
      className={buttonClass}
      onClick={handleSentMessage}
    >
      <div className="flex flex-grow justify-center items-center font-bold">
        <SendIcon className="w-5 h-5 fill-primary-base" />
      </div>
    </button>
  );
};

export default SendButton;
