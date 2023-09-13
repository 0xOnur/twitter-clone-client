import GroupChat from "./GroupChat";
import NormalChat from "./NormalChat";
import { UserState } from "@redux/slices/userSlice";

interface IProps {
  chat: IChat;
  reduxUser: UserState;
  isSelectedChat?: boolean;
}

const ChatPreview = ({
  chat,
  reduxUser,
  isSelectedChat,
}: IProps) => {
  return (
    <div key={chat._id}>
      {chat.isGroupChat ? (
        <GroupChat
          isSelectedChat={isSelectedChat}
          reduxUser={reduxUser}
          key={chat._id}
          chat={chat}
        />
      ) : (
        <NormalChat
          isSelectedChat={isSelectedChat}
          reduxUser={reduxUser}
          key={chat._id}
          chat={chat}
        />
      )}
    </div>
  );
};

export default ChatPreview;
