import { useDebouncedSearchUser } from "@hooks/useSearchUser";
import useGetConversations from "@hooks/Chat/Queries/useGetConversations";
import UserList from "@components/rightSidebarComp/Search/UserList";
import PreviousChatPreview from "../CreateChat/previousChat";
import { selectChatComposer } from "@redux/slices/chatComposerSlice";
import SelectedUsers from "../CreateChat/SelectedUsers";
import { RootState } from "@redux/config/store";
import SelectedGroups from "./SelectedGroups";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import Search from "../Tools/Search";
import Composer from "./Composer";
import Header from "./Header";

interface IProps {
  tweet: ITweet;
  closeModal: () => void;
}

const ShareTweetModal = ({ tweet, closeModal }: IProps) => {
  const reduxUser = useSelector((state: RootState) => state.user);
  const chatComposer = useSelector(selectChatComposer);

  const [searchText, setSearchText] = useState("");
  const [selectedConversations, setSelectConversations] = useState<IChat[]>([]);
  const [selectedUsers, setSelectUsers] = useState<IUser[]>([]);

  const { data, isLoading } = useDebouncedSearchUser(searchText);
  const { chats: previousChats } = useGetConversations();

  return (
    <div className="z-10 bg-[color:var(--background-primary)] w-full max-w-600px rounded-xl overflow-hidden">
      <div className="overflow-y-auto max-h-90vh">
        <div className="flex flex-col w-full min-h-400px">
          <div className="sticky top-0 z-10">
            <Header closeModal={closeModal} />

            <div className="flex flex-col relative">
              <Search searchText={searchText} setSearchText={setSearchText} />

              {isLoading && searchText && <div className="loader w-full" />}

              {selectedConversations?.length > 0 && (
                <SelectedGroups
                  reduxUser={reduxUser}
                  selectedConversations={selectedConversations}
                  setSelectConversations={setSelectConversations}
                />
              )}
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
              previousChats &&
              previousChats.length > 0 && (
                <div>
                  {previousChats.map((chat) => (
                    <PreviousChatPreview
                      key={chat._id}
                      chat={chat}
                      reduxUser={reduxUser}
                      isMessageShare={true}
                      selectedUsers={selectedUsers}
                      setSelectUsers={setSelectUsers}
                      selectedConversations={selectedConversations}
                      setSelectConversations={setSelectConversations}
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
        <div className="sticky bottom-0 z-10">
          <Composer
            tweet={tweet}
            closeModal={closeModal}
            chatComposer={chatComposer}
            selectedUsers={selectedUsers}
            selectedConversations={selectedConversations}
          />
        </div>
      </div>
    </div>
  );
};

export default ShareTweetModal;
