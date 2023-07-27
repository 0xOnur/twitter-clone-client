import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchUser } from "api/userApi";
import Search from "./Search";
import CreateGroup from "./CreateGroup";
import Header from "./Header";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import UserList from "@components/rightSidebarComp/Search/UserList";
import SelectedUsers from "./SelectedUsers";

const ChatComposeModal = () => {
  const navigate = useNavigate();

  const modalRef = useRef<HTMLDivElement>(null);

  const [searchText, setSearchText] = useState("");
  const [selectedUsers, setSelectUsers] = useState<IUser[]>([]);

  const { data, refetch, isLoading } = useQuery<IUser[]>({
    queryKey: ["searchUser", searchText],
    queryFn: () => searchUser(searchText),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const debouncedSearch = useCallback(
    debounce((searchText) => {
      if (searchText.length > 0) {
        refetch();
      }
    }, 500),
    []
  );

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
            <Header />

            <div className="flex flex-col relative">
              <Search searchText={searchText} setSearchText={setSearchText} />
              {isLoading && searchText && <div className="loader w-full" />}
              {searchText.length === 0 && selectedUsers.length === 0 && (
                <CreateGroup />
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
            {data?.map((user) => (
              <UserList
                key={user._id}
                user={user}
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
