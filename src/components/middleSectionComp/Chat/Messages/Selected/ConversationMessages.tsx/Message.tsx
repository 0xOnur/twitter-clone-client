import useReadMessage from "@hooks/Chat/Queries/useReadMessage";
import { UserState } from "@redux/slices/userSlice";
import NormalMessage from "./MessageTypes/NormalMessage";
import ReplyMessage from "./MessageTypes/ReplyMessage";
import {useEffect} from "react"

interface IProps {
  conversation: IChat;
  isMine: boolean;
  message: IMessage;
  reduxUser: UserState;
}

const Message = ({ conversation, reduxUser, isMine, message }: IProps) => {
  const { mutate } = useReadMessage({message: message});

  const readBy = message.readBy?.map((user) => user._id);

  //check if reduxUser is in readBy array
  const isRead = readBy?.includes(reduxUser.user._id);

  useEffect(() => {
    if (!isMine && !isRead) {
      mutate(message._id!)
    }
  }, [])

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
