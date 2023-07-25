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
          reduxUser={reduxUser}
          key={chat._id}
          chat={chat}
        />
      ) : (
        <NormalChat
          reduxUser={reduxUser}
          key={chat._id}
          chat={chat}
          />
      )}
    </div>
  );
};

export default ChatPreview;
