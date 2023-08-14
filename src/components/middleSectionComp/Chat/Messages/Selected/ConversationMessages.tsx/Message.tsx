import { UserState } from "@redux/slices/userSlice";
import NormalMessage from "./MessageTypes/NormalMessage";

interface IProps {
  conversation: IChat;
  isMine: boolean;
  message: IMessage;
  reduxUser: UserState;
}

const Message = ({ conversation, reduxUser, isMine, message }: IProps) => {
  switch (message.type) {
    case "message":
      return (<NormalMessage
        conversation={conversation}
        reduxUser={reduxUser}
        message={message}
        isMine={isMine}
      />)
  
    default:
      break;
  }

  return null;
};

export default Message;
