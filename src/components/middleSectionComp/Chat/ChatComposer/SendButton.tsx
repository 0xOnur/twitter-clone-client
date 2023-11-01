import { SendIcon } from "@icons/Icon";
import classNames from "classnames";

interface IProps {
  isTweetShare?: boolean;
  isMessageReady?: boolean;
  isReadyForTweetShare?: boolean;
  handleSentMessage: () => void;
}

const SendButton = ({
  isTweetShare,
  isMessageReady,
  handleSentMessage,
  isReadyForTweetShare,
}: IProps) => {
  const hoverClassNames = classNames(
    "absolute inset-0 w-full h-full rounded-full",
    {
      "opacity-50": isTweetShare ? !isReadyForTweetShare : !isMessageReady,
      "group-hover:bg-[color:var(--color-primary)] opacity-10": isReadyForTweetShare || isMessageReady,
    }
  );

  return (
    <button
      type="submit"
      title="Send"
      disabled={isTweetShare ? !isReadyForTweetShare : !isMessageReady}
      className="relative w-fit p-2 group disabled:opacity-50"
      onClick={handleSentMessage}
    >
      <div className={hoverClassNames} />
      <span className="w-8 h-8">
        <SendIcon className="w-5 h-5 text-[color:var(--color-primary)]" />
      </span>
    </button>
  );
};

export default SendButton;
