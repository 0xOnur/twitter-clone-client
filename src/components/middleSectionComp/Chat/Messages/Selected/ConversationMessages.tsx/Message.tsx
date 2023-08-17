import { UserState } from "@redux/slices/userSlice";
import NormalMessage from "./MessageTypes/NormalMessage";
import ReplyMessage from "./MessageTypes/ReplyMessage";

interface IProps {
  conversation: IChat;
  isMine: boolean;
  message: IMessage;
  reduxUser: UserState;
}

const Message = ({ conversation, reduxUser, isMine, message }: IProps) => {
  switch (message.type) {
    case "message":
      return (
        <NormalMessage
          conversation={conversation}
          reduxUser={reduxUser}
          message={message}
          isMine={isMine}
        />
      );

    case "reply":
      return (
        <ReplyMessage
          conversation={conversation}
          reduxUser={reduxUser}
          message={message}
          isMine={isMine}
        />
      );
  }

  return null;
};

export default Message;
