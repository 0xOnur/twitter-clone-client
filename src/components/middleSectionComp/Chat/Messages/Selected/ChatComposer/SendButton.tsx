import { SendIcon } from "@icons/Icon";
import classNames from "classnames";

interface IProps {
  messageText: string;
  conversationId: string;
}

const SendButton = ({ messageText, conversationId }: IProps) => {

    const isMessageReady = messageText.trim().length > 0;

    const buttonClass = classNames("flex ml-1 items-center min-h-[36px] min-w-[36px] rounded-full hover:bg-primary-hover duration-200",{
        "opacity-50": !isMessageReady,
    })

  return (
    <button type="submit" className={buttonClass} onClick={() => {
        console.log("send message")
    }}>
      <div className="flex flex-grow justify-center items-center font-bold">
        <SendIcon className="w-5 h-5 fill-primary-base" />
      </div>
    </button>
  );
};

export default SendButton;
