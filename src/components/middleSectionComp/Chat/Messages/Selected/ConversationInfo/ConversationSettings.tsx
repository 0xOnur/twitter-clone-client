import { LeaveChatModal } from "@components/middleSectionComp/DialogModals";
import { useModal } from "contexts/ModalContext";

interface IProps {
  chat: IChat;
  otherParticipants: {
    user: IUser;
    hasLeft: boolean;
    isPinned: boolean;
  }[];
}

const ConversationSettings = ({ chat, otherParticipants }: IProps) => {
  const { openModal, closeModal } = useModal();

  const handleLeave = () => {
    openModal(<LeaveChatModal chatId={chat._id} closeModal={closeModal} />);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
        <div className="bg-gray-extraLight h-px my-1" />
      </div>

      {!chat.isGroupChat && (
        <div className="flex w-full hover:bg-primary-extraLight duration-200">
          <button className="flex w-full min-h-[48px] p-4 justify-center text-primary-base">
            Block @{otherParticipants[0].user.username}
          </button>
        </div>
      )}

      <div className="flex w-full hover:bg-primary-extraLight duration-200">
        <button className="flex w-full min-h-[48px] p-4 justify-center text-primary-base">
          {chat.isGroupChat
            ? "Report conversation"
            : `Report @${otherParticipants[0].user.username}`}
        </button>
      </div>

      <div className="flex w-full hover:bg-red-remove duration-200">
        <button
          onClick={handleLeave}
          className="flex w-full min-h-[48px] p-4 justify-center text-red-removeText"
        >
          Leave conversation
        </button>
      </div>
    </div>
  );
};

export default ConversationSettings;
