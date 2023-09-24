import useGetConversations from "@hooks/Chat/Queries/useGetConversations";
import { useDebouncedSearchUser } from "@hooks/useSearchUser";
import PreviousChatPreview from "../CreateChat/previousChat";
import SelectedUsers from "../CreateChat/SelectedUsers";
import { RootState } from "@redux/config/store";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import Search from "../Tools/Search";
import Header from "./Header";
import SearchUser from "./SearchUser";


interface IProps {
  group: IChat;
  closeModal: () => void;
}

const AddPeopleModal = ({ group, closeModal }: IProps) => {
  const reduxUser = useSelector((state: RootState) => state.user);
  const [searchText, setSearchText] = useState("");
  const [selectedUsers, setSelectUsers] = useState<IUser[]>([]);
  const { data, isLoading } = useDebouncedSearchUser(searchText);
  const previousChats = useGetConversations();

  return (
    <div className="z-10 text-black bg-white w-full max-w-600px rounded-xl overflow-hidden">
      <div className="overflow-y-auto max-h-90vh">
        <div className="flex flex-col w-full min-h-400px">
          <div className="sticky top-0 z-20">
            <Header chat={group} closeModal={closeModal} selectedUsers={selectedUsers} />
            <div className="flex flex-col relative">
              <Search searchText={searchText} setSearchText={setSearchText} />

              {isLoading && searchText && <div className="loader w-full" />}

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
                  {previousChats.data
                    ?.filter((chat) => !chat.isGroupChat)
                    .map((normalChat) => (
                      <PreviousChatPreview
                        key={normalChat._id}
                        chat={normalChat}
                        isAddPeopleMode={true}
                        addPeopleChat={group}
                        reduxUser={reduxUser}
                        selectedUsers={selectedUsers}
                        setSelectUsers={setSelectUsers}
                      />
                    ))}
                </div>
              )}
            {data?.map((user) => (
              <SearchUser
                user={user}
                reduxUser={reduxUser}
                addPeopleChat={group}
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

export default AddPeopleModal;
