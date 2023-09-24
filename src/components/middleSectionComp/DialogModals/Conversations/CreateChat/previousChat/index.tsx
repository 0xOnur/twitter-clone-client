import React from "react";
import GroupPreview from "./GroupPreview";
import NormalPreview from "./NormalPreview";
import { UserState } from "@redux/slices/userSlice";

interface IProps {
  chat: IChat;
  reduxUser: UserState;
  isGroupMode?: boolean;
  isMessageShare?: boolean;
  addPeopleChat?: IChat;
  isAddPeopleMode?: boolean;
  selectedUsers: IUser[];
  setSelectUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
  selectedConversations?: IChat[];
  setSelectConversations?: React.Dispatch<React.SetStateAction<IChat[]>>;
}

const PreviousChatPreview = ({
  chat,
  reduxUser,
  isGroupMode,
  addPeopleChat,
  isAddPeopleMode,
  isMessageShare,
  selectedUsers,
  setSelectUsers,
  selectedConversations,
  setSelectConversations,
}: IProps) => {
  return (
    <div key={chat._id}>
      {chat.isGroupChat ? (
        <GroupPreview
          chat={chat}
          reduxUser={reduxUser}
          isGroupMode={isGroupMode}
          isMessageShare={isMessageShare}
          selectedUsers={selectedUsers}
          selectedConversations={selectedConversations}
          setSelectConversations={setSelectConversations}
        />
      ) : (
        <NormalPreview
          chat={chat}
          reduxUser={reduxUser}
          addPeopleChat={addPeopleChat}
          isAddPeopleMode={isAddPeopleMode}
          selectedUsers={selectedUsers}
          setSelectUsers={setSelectUsers}
        />
      )}
    </div>
  );
};

export default PreviousChatPreview;
