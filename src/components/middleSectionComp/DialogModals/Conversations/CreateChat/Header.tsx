import useCreateConversation from "@hooks/Chat/Mutations/useCreateConversation";
import { BackIcon, CancelIcon } from "@icons/Icon";
import { useNavigate } from "react-router-dom";

interface IProps {
  isGroupMode: boolean;
  selectedUsers: IUser[];
}

const Header = ({ selectedUsers, isGroupMode }: IProps) => {
  const navigate = useNavigate();
  const isNextActive = selectedUsers.length > 0;

  const { createConversationMutation } = useCreateConversation({
    users: selectedUsers,
  });

  const handleNext = () => {
    createConversationMutation.mutate(selectedUsers);
  };

  return (
    <div className="flex flex-row h-[53px] justify-between py-3 px-1 pr-3 bg-white border-gray-200">
      <div className="flex flex-row items-center gap-3">
        <button
          title="Close"
          type="button"
          onClick={() => {
            navigate(-1);
          }}
          className="p-3 hover:bg-gray-extraLight rounded-full"
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
                <span className="text-sm leading-4 font-normal text-gray-dark">
                  Add people
                </span>
              </div>
            ): (
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
          className="disabled:opacity-50 bg-black text-white py-2 px-4 rounded-full font-bold"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Header;
