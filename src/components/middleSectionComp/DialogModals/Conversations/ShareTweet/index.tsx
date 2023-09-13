import { useDebouncedSearchUser } from "@hooks/Queries/User/useSearchUser";
import useGetConversations from "@hooks/Chat/Queries/useGetConversations";
import UserList from "@components/rightSidebarComp/Search/UserList";
import PreviousChatPreview from "../CreateChat/previousChat";
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

  const [searchText, setSearchText] = useState("");
  const [selectedConversations, setSelectConversations] = useState<IChat[]>([]);
  const [selectedUsers, setSelectUsers] = useState<IUser[]>([]);

  const { data, isLoading } = useDebouncedSearchUser(searchText);
  const previousChats = useGetConversations();

  return (
    <div className="z-10 text-black bg-white w-full max-w-600px rounded-xl overflow-hidden">
      <div className="flex flex-col overflow-y-auto max-h-90vh">
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
            previousChats.data &&
            previousChats.data.length > 0 && (
              <div>
                {previousChats.data.map((chat) => (
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
        <div className="sticky bottom-0 z-10">
          <Composer
            tweet={tweet}
            closeModal={closeModal}
            selectedUsers={selectedUsers}
            selectedConversations={selectedConversations}
          />
        </div>
      </div>
    </div>
  );
};

export default ShareTweetModal;
