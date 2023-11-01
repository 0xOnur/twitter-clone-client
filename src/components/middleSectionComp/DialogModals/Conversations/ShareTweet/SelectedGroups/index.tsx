import GroupConversation from "./GroupConversation";
import { UserState } from "@redux/slices/userSlice";
import React from "react";

interface IProps {
  reduxUser: UserState;
  selectedConversations: IChat[];
  setSelectConversations: React.Dispatch<React.SetStateAction<IChat[]>>;
}

const SelectedGroups = ({
  reduxUser,
  selectedConversations,
  setSelectConversations,
}: IProps) => {
  const handleRemove = (conversation: IChat) => {
    return () => {
      const newSelectedConversations = selectedConversations.filter(
        (selectedConversation) => selectedConversation._id !== conversation._id
      );
      setSelectConversations(newSelectedConversations);
    };
  };

  return (
    <div className="flex flex-row flex-wrap p-1 border-b-2 border-[color:var(--background-third)] bg-[color:var(--background-primary)]">
      {selectedConversations.map((conversation) => (
        <button
          key={conversation._id}
          onClick={handleRemove(conversation)}
          className="min-h-[32px] max-w-[90%] m-1 border border-[color:var(--color-primary)] rounded-full overflow-hidden"
        >
          <GroupConversation chat={conversation} reduxUser={reduxUser} />
        </button>
      ))}
    </div>
  );
};

export default SelectedGroups;
