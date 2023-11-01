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
      {!chat.isGroupChat && (
        <div className="flex w-full relative">
          <button className="flex w-full min-h-[48px] p-4 justify-center cursor-not-allowed">
            <span className="text-[color:var(--color-primary)]">Block @{otherParticipants[0].user.username}</span>
            <div className="absolute inset-0 opacity-10 hover:bg-[color:var(--color-primary)] duration-200" />
          </button>
        </div>
      )}

      <div className="flex w-full relative">
        <button className="flex w-full min-h-[48px] p-4 justify-center cursor-not-allowed">
          <span className="text-[color:var(--color-primary)]">
          {chat.isGroupChat
            ? "Report conversation"
            : `Report @${otherParticipants[0].user.username}`}
          </span>
          <div className="absolute inset-0 opacity-10 hover:bg-[color:var(--color-primary)] duration-200" />
        </button>
      </div>

      <div className="flex w-full relative">
        <button
          onClick={handleLeave}
          className="flex w-full min-h-[48px] p-4 justify-center"
        >
          <span className="text-red-base">
            Leave conversation
          </span>
          <div className="absolute inset-0 opacity-10 hover:bg-red-base duration-200" />
        </button>
      </div>
    </div>
  );
};

export default ConversationSettings;
