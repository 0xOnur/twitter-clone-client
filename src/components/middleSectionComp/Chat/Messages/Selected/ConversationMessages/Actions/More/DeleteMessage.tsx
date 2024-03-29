import { DeleteMessageModal } from "@components/middleSectionComp/DialogModals";
import { TrashIcon } from "@icons/Icon";
import { useModal } from "contexts/ModalContext";

interface IProps {
  messageId: string;
  setOpenMore: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteMessage = ({ messageId, setOpenMore }: IProps) => {
  const { openModal, closeModal } = useModal();

  const handleDelete = () => {
    setOpenMore(false);
    openModal(
      <DeleteMessageModal messageId={messageId} closeModal={closeModal} />
    )
  }

  return (
    <button
      onClick={handleDelete}
      className="flex flex-row items-center w-full py-3 px-4 hover:bg-[color:var(--background-secondary)] duration-200"
    >
      <div className="flex pr-3 justify-center">
        <TrashIcon className="w-5 h-5" />
      </div>
      <div className="flex shrink grow w-full">
        <span className="font-bold">Delete for you</span>
      </div>
    </button>
  );
};

export default DeleteMessage;
