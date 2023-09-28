import { SendIcon } from "@icons/Icon";
import classNames from "classnames";

interface IProps {
  isTweetShare?: boolean;
  isMessageReady?: boolean;
  isReadyForTweetShare?:boolean;
  handleSentMessage: () => void
}

const SendButton = ({ isTweetShare, isMessageReady, handleSentMessage, isReadyForTweetShare }: IProps) => {

  const buttonClass = classNames(
    "flex ml-1 items-center min-h-[36px] min-w-[36px] rounded-full duration-200",
    {
      "opacity-50": isTweetShare ? !isReadyForTweetShare : !isMessageReady,
      "hover:bg-primary-hover": isReadyForTweetShare || isMessageReady,
    }
  );

  return (
    <button
      type="submit"
      disabled={
        isTweetShare ? !isReadyForTweetShare : !isMessageReady
      }
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
