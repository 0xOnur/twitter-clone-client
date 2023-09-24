import useAddUser from "@hooks/Chat/Mutations/useAddUser";
import { CancelIcon } from "@icons/Icon";
import React, { useEffect } from "react";

interface IProps {
  chat: IChat;
  selectedUsers: IUser[];
  closeModal: () => void;
}

const Header = ({ chat, closeModal, selectedUsers }: IProps) => {
  const { mutate, isSuccess } = useAddUser();
  const isReadyToAdd = selectedUsers.length > 0;

  const handleAdd = () => {
    mutate({
      chatId: chat._id,
      users: selectedUsers,
    });
  };

  useEffect(() => {
    if (isSuccess) closeModal();
  }, [isSuccess]);

  return (
    <div className="flex flex-row h-[53px] justify-between py-3 px-1 pr-3 bg-white border-gray-200">
      <div className="flex flex-row items-center gap-3">
        <button
          title={"Close"}
          type="button"
          onClick={closeModal}
          className="p-3 hover:bg-gray-extraLight rounded-full"
        >
          <CancelIcon className={"w-5 h-5"} />
        </button>
        <div>
          <span className="text-xl leading-6 font-bold">
            <h2>Add people</h2>
          </span>
        </div>
      </div>

      <div className="leading-4">
        <button
          type="button"
          onClick={handleAdd}
          disabled={!isReadyToAdd}
          className="disabled:opacity-50 bg-black text-white py-2 px-4 rounded-full font-bold"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Header;
