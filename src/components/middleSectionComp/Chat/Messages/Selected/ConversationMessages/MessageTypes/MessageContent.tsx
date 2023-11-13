import classNames from "classnames";

interface IProps {
  isMine: boolean;
  message: IMessage;
}

const MessageContent = ({ isMine, message }: IProps) => {
  const messageBox = classNames(
    "grid items-start rounded-3xl box-border max-w-full py-3 px-4",
    {
      "bg-[color:var(--color-primary)] text-white rounded-br-[4px]": isMine,
      "bg-[color:var(--background-third)] rounded-bl-[4px]": !isMine,
    }
  );

  return (
    <div className={messageBox}>
      <div className="break-words min-w-0 overflow-hidden">
        <span className="whitespace-pre-wrap antialiased">
          {message.content}
        </span>
      </div>
    </div>
  );
};

export default MessageContent;
