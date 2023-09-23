import { useDebouncedSearchUser } from "@hooks/useSearchUser";
import useGetConversations from "@hooks/Chat/Queries/useGetConversations";
import UserList from "@components/rightSidebarComp/Search/UserList";
import PreviousChatPreview from "./previousChat";
import { RootState } from "@redux/config/store";
import SelectedUsers from "./SelectedUsers";
import { useSelector } from "react-redux";
import CreateGroup from "./CreateGroup";
import React, { useState } from "react";
import Search from "../Tools/Search";
import Header from "./Header";

interface IProps {
  closeModal: () => void;
}

const ChatComposeModal = ({ closeModal }: IProps) => {
  const reduxUser = useSelector((state: RootState) => state.user);

  const [isGroupMode, setGroupMode] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedUsers, setSelectUsers] = useState<IUser[]>([]);

  const { data, isLoading } = useDebouncedSearchUser(searchText);

  const previousChats = useGetConversations();

  return (
    <div className="z-10 text-black bg-white w-full max-w-600px rounded-xl overflow-hidden">
      <div className="overflow-y-auto max-h-90vh">
        <div className="flex flex-col w-full min-h-400px">
          <div className="sticky top-0 z-20">
            <Header
              closeModal={closeModal}
              isGroupMode={isGroupMode}
              setGroupMode={setGroupMode}
              selectedUsers={selectedUsers}
            />

            <div className="flex flex-col relative">
              <Search searchText={searchText} setSearchText={setSearchText} />

              {isLoading && searchText && <div className="loader w-full" />}

              {searchText.length === 0 &&
                selectedUsers.length === 0 &&
                !isGroupMode && <CreateGroup setGroupMode={setGroupMode} />}

              {selectedUsers?.length > 0 && (
                <SelectedUsers
                  selectedUsers={selectedUsers}
                  setSelectUsers={setSelectUsers}
                />
              )}
            </div>
          </div>
          <div>
            {searchText.length === 0 &&
              previousChats.data &&
              previousChats.data.length > 0 && (
                <div>
                  {previousChats.data.map((chat) => (
                    <PreviousChatPreview
                      chat={chat}
                      reduxUser={reduxUser}
                      isGroupMode={isGroupMode}
                      selectedUsers={selectedUsers}
                      setSelectUsers={setSelectUsers}
                    />
                  ))}
                </div>
              )}
            {data?.map((user) => (
              <UserList
                key={user._id}
                user={user}
                setSearchText={setSearchText}
                selectedUsers={selectedUsers}
                setSelectUsers={setSelectUsers}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComposeModal;
