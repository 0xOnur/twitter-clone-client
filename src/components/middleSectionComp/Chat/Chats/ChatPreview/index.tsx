import GroupChat from "./GroupChat";
import NormalChat from "./NormalChat";
import { UserState } from "@redux/slices/userSlice";

interface IProps {
  chat: IChat;
  reduxUser: UserState;
}

const ChatPreview = ({ chat, reduxUser }: IProps) => {
  
  return (
    <div key={chat._id}>
      {chat.isGroupChat ? (
        <GroupChat
          key={chat._id}
          chat={chat}
        />
      ) : (
        <NormalChat
          key={chat._id}
          reduxUser={reduxUser}
          chat={chat}
          />
      )}
    </div>
  );
};

export default ChatPreview;
