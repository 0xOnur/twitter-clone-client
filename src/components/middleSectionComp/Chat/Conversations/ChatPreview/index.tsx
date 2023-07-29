import GroupChat from "./GroupChat";
import NormalChat from "./NormalChat";
import { UserState } from "@redux/slices/userSlice";

interface IProps {
  chat: IChat;
  reduxUser: UserState;
  isComposeMode?: boolean;
  selectedUsers?: IUser[];
  setSelectUsers?: React.Dispatch<React.SetStateAction<IUser[]>>;
}

const ChatPreview = ({
  chat,
  reduxUser,
  isComposeMode,
  selectedUsers,
  setSelectUsers,
}: IProps) => {
  return (
    <div key={chat._id}>
      {chat.isGroupChat ? (
        <GroupChat
          isComposeMode={isComposeMode}
          selectedUsers={selectedUsers}
          reduxUser={reduxUser}
          key={chat._id}
          chat={chat}
        />
      ) : (
        <NormalChat
          isComposeMode={isComposeMode}
          selectedUsers={selectedUsers}
          setSelectUsers={setSelectUsers}
          reduxUser={reduxUser}
          key={chat._id}
          chat={chat}
        />
      )}
    </div>
  );
};

export default ChatPreview;