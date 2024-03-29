import { ChatComposeModal } from "@components/middleSectionComp/DialogModals";
import { MessagesIcon, SettingsIcon } from "@icons/Icon";
import { useModal } from "contexts/ModalContext";

const ChatHeader = () => {
  const { openModal, closeModal } = useModal();

  const handleCompose = () => {
    openModal(<ChatComposeModal closeModal={closeModal} />);
  };

  return (
    <div className="sticky top-0 h-[56px] z-10 backdrop-blur-md bg-[color:var(--background-primary-alpha)]">
      <div className="h-full w-full py-4">
        <div className="flex flex-row w-full h-full items-center justify-between px-4">
          <div>
            <span className="text-xl leading-6 font-bold">Messages</span>
          </div>
          <div className="min-w-[56px] items-end justify-center">
            <div className="flex flex-row gap-1">
              <button
                disabled
                title="Settings"
                className="p-3 hover:bg-[color:var(--background-third)] rounded-full cursor-not-allowed"
              >
                <SettingsIcon className="w-5 h-5" />
              </button>
              <button
                onClick={handleCompose}
                title="New message"
                className="p-3 hover:bg-[color:var(--background-third)] rounded-full"
              >
                <MessagesIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
