import GroupChat from "./GroupChat";
import NormalChat from "./NormalChat";
import { UserState } from "@redux/slices/userSlice";

interface IProps {
  chat: IChat;
  reduxUser: UserState;
  isSelectedChat?: boolean;
  isGroupMode?: boolean;
  selectedUsers?: IUser[];
  isComposeMode?: boolean;
  setSelectUsers?: React.Dispatch<React.SetStateAction<IUser[]>>;
}

const ChatPreview = ({
  chat,
  reduxUser,
  isSelectedChat,
  isGroupMode,
  isComposeMode,
  selectedUsers,
  setSelectUsers,
}: IProps) => {
  return (
    <div key={chat._id}>
      {chat.isGroupChat ? (
        <GroupChat
          isSelectedChat={isSelectedChat}
          isComposeMode={isComposeMode}
          selectedUsers={selectedUsers}
          isGroupMode={isGroupMode}
          reduxUser={reduxUser}
          key={chat._id}
          chat={chat}
        />
      ) : (
        <NormalChat
          isSelectedChat={isSelectedChat}
          setSelectUsers={setSelectUsers}
          isComposeMode={isComposeMode}
          selectedUsers={selectedUsers}
          reduxUser={reduxUser}
          key={chat._id}
          chat={chat}
        />
      )}
    </div>
  );
};

export default ChatPreview;
