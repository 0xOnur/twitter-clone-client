import useCreateConversation from "@hooks/Chat/Mutations/useCreateConversation";
import { BackIcon, CancelIcon } from "@icons/Icon";
import React, { useEffect } from "react";

interface IProps {
  isGroupMode: boolean;
  selectedUsers: IUser[];
  closeModal: () => void;
  setGroupMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({
  selectedUsers,
  isGroupMode,
  closeModal,
  setGroupMode,
}: IProps) => {
  const isNextActive = selectedUsers.length > 0;

  const { mutate, isSuccess } = useCreateConversation();

  const handleNext = () => {
    mutate(selectedUsers);
  };

  const handleBackOrCancel = () => {
    if (isGroupMode) {
      setGroupMode(false);
    } else {
      closeModal();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      closeModal();
    }
  }, [isSuccess, closeModal]);

  return (
    <div className="flex flex-row h-[53px] justify-between py-3 px-1 pr-3 bg-[color:var(--background-primary)]">
      <div className="flex flex-row items-center gap-3 mx-2">
        <button
          title={isGroupMode ? "Back": "Close"}
          type="button"
          onClick={handleBackOrCancel}
          className="p-2 hover:bg-[color:var(--background-third)] rounded-full"
        >
          {isGroupMode ? (
            <BackIcon className="w-5 h-5" />
          ) : (
            <CancelIcon className={"w-5 h-5"} />
          )}
        </button>
        <div>
          <span className="text-xl leading-6 font-bold">
            {isGroupMode ? (
              <div className="flex flex-col gap-1">
                <h2>New group</h2>
                <span className="text-sm leading-4 font-normal">
                  Add people
                </span>
              </div>
            ) : (
              <h2>New message</h2>
            )}
          </span>
        </div>
      </div>

      <div className="leading-4">
        <button
          type="button"
          onClick={handleNext}
          disabled={!isNextActive}
          className="disabled:opacity-50 bg-[color:var(--color-base)] hover:opacity-80 py-2 px-4 rounded-full duration-200"
        >
          <span className="font-semibold text-[color:var(--background-primary)]">
            Next
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;
