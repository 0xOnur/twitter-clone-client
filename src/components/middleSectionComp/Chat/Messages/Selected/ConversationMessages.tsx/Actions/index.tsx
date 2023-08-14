import EmojiReact from "./EmojiReact";
import MoreButton from "./More";
import classNames from "classnames";
import { useState } from "react";

interface IProps {
  isMine: boolean;
  message: IMessage;
}

const MessageActions = ({ isMine, message }: IProps) => {
  const [isOpenMore, setOpenMore] = useState(false);
  
  const messageActionBox = classNames(
    "flex flex-row self-center opacity-0 group-hover/message:opacity-100",
    {
      "justify-end pr-1": isMine,
      "justify-start pl-1": !isMine,
      "opacity-100": isOpenMore,
    }
  );
  return (
    <div className={messageActionBox}>
      <EmojiReact />
      <MoreButton
        isMine={isMine}
        message={message}
        isOpenMore={isOpenMore}
        setOpenMore={setOpenMore}
      />
    </div>
  );
};

export default MessageActions;
