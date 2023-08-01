import ChatPreview from "@components/middleSectionComp/Chat/Conversations/ChatPreview";
import { useDebouncedSearchUser } from "@hooks/Queries/User/useSearchUser";
import useGetConversations from "@hooks/Queries/Chat/useGetConversations";
import React, { useCallback, useEffect, useRef, useState } from "react";
import UserList from "@components/rightSidebarComp/Search/UserList";
import { useNavigate } from "react-router-dom";
import { RootState } from "@redux/config/store";
import { useSelector } from "react-redux";
import CreateGroup from "./CreateGroup";
import SelectedUsers from "./SelectedUsers";
import Search from "./Search";
import Header from "./Header";

interface IProps {
  isGroupMode: boolean;
}

const ChatComposeModal = ({ isGroupMode }: IProps) => {
  const reduxUser = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

  const [searchText, setSearchText] = useState("");
  const [selectedUsers, setSelectUsers] = useState<IUser[]>([]);

  const { data, isLoading, debouncedSearch } =
    useDebouncedSearchUser(searchText);

  const previousChats = useGetConversations();

  useEffect(() => {
    debouncedSearch(searchText);
  }, [searchText]);

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current && modalRef.current.contains(event.target as Node)) {
        navigate(-1);
      }
    },
    [modalRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div ref={modalRef} className="fixed inset-0 bg-black opacity-60" />
      <div className="z-10 border-2 shadow-2xl text-black bg-white w-full max-w-600px min-h-400px rounded-xl overflow-hidden">
        <div className="overflow-y-auto max-h-90vh">
          <div className="sticky top-0 z-20">
            <Header selectedUsers={selectedUsers} isGroupMode={isGroupMode} />

            <div className="flex flex-col relative">
              <Search searchText={searchText} setSearchText={setSearchText} />

              {isLoading && searchText && <div className="loader w-full" />}

              { searchText.length === 0 &&
                selectedUsers.length === 0 &&
                !isGroupMode && <CreateGroup />
              }
                
              {selectedUsers?.length > 0 && (
                <SelectedUsers
                  selectedUsers={selectedUsers}
                  setSelectUsers={setSelectUsers}
                />
              )}
            </div>
          </div>
          <div>
            { searchText.length === 0 &&
              previousChats.data &&
              previousChats.data.length > 0 && (
                <div>
                  {previousChats.data.map((chat) => (
                    <ChatPreview
                      key={chat._id}
                      chat={chat}
                      reduxUser={reduxUser}
                      isComposeMode={true}
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
