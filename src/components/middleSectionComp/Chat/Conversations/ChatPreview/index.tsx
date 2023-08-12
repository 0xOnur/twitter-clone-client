import GroupChat from "./GroupChat";
import NormalChat from "./NormalChat";
import { UserState } from "@redux/slices/userSlice";

interface IProps {
  chat: IChat;
  reduxUser: UserState;
  isSelected?: boolean;
  isGroupMode?: boolean;
  selectedUsers?: IUser[];
  isComposeMode?: boolean;
  setSelectUsers?: React.Dispatch<React.SetStateAction<IUser[]>>;
}

const ChatPreview = ({
  chat,
  reduxUser,
  isSelected,
  isGroupMode,
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
          isGroupMode={isGroupMode}
          isSelected={isSelected}
          reduxUser={reduxUser}
          key={chat._id}
          chat={chat}
        />
      ) : (
        <NormalChat
          setSelectUsers={setSelectUsers}
          isComposeMode={isComposeMode}
          selectedUsers={selectedUsers}
          isSelected={isSelected}
          reduxUser={reduxUser}
          key={chat._id}
          chat={chat}
        />
      )}
    </div>
  );
};

export default ChatPreview;
