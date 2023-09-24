import { LeaveChatModal } from "@components/middleSectionComp/DialogModals";
import { useModal } from "contexts/ModalContext";
import { TrashIcon } from "@icons/Icon";

interface IProps {
  chatId: string;
}

const LeaveChat = ({ chatId }: IProps) => {
  const { openModal, closeModal } = useModal();

  const handleLeave = () => {
    openModal(<LeaveChatModal chatId={chatId} closeModal={closeModal} />);
  };

  return (
    <button
      onClick={handleLeave}
      className="flex flex-row gap-2 py-3 px-4 items-center hover:bg-gray-dropdown"
    >
      <TrashIcon className="w-5 h-5 fill-red-removeText" />
      <span className="font-bold text-red-removeText">Delete conversation</span>
    </button>
  );
};

export default LeaveChat;
