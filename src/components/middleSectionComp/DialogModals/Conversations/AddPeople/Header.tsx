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
  }, [isSuccess, closeModal]);

  return (
    <div className="flex flex-row h-[53px] justify-between py-3 px-1 pr-3 bg-[color:var(--background-primary)]">
      <div className="flex flex-row items-center gap-3 mx-2">
        <button
          title="Close"
          type="button"
          onClick={closeModal}
          className="p-2 hover:bg-[color:var(--background-third)] rounded-full"
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
          className="disabled:opacity-50 bg-[color:var(--color-base)] hover:opacity-80 py-2 px-4 rounded-full duration-200"
        >
          <span className="font-semibold text-[color:var(--background-primary)]">
            Add
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;
