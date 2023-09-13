import useReadMessage from "@hooks/Chat/Mutations/useReadMessage";
import { UserState } from "@redux/slices/userSlice";
import NormalMessage from "./MessageTypes/NormalMessage";
import ReplyMessage from "./MessageTypes/ReplyMessage";
import {useEffect} from "react"
import { useInView } from "react-intersection-observer";

interface IProps {
  conversation: IChat;
  isMine: boolean;
  message: IMessage;
  reduxUser: UserState;
}

const Message = ({ conversation, reduxUser, isMine, message }: IProps) => {
  const { mutate } = useReadMessage({message: message});
  const { ref, inView } = useInView();
  const readBy = message.readBy?.map((user) => user._id);

  //check if reduxUser is in readBy array
  const isRead = readBy?.includes(reduxUser.user._id);

  useEffect(() => {
    if (!isMine && !isRead && inView) {
      mutate(message._id!)
    }
  }, [inView])

  switch (message.type) {
    case "message":
      return (
        <div ref={ref}>
          <NormalMessage
            conversation={conversation}
            reduxUser={reduxUser}
            message={message}
            isMine={isMine}
          />
        </div>
        
      );

    case "reply":
      return (
        <div ref={ref}>
          <ReplyMessage
            conversation={conversation}
            reduxUser={reduxUser}
            message={message}
            isMine={isMine}
          />
        </div>
        
      );
  }

  return null;
};

export default Message;
