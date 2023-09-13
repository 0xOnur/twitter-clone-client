import { ShareTweetModal } from "@components/middleSectionComp/DialogModals";
import { useModal } from "contexts/ModalContext";
import { MessagesIcon } from "@icons/Icon";

interface IProps {
  tweet: ITweet;
}

const SendViaMessage = ({ tweet }: IProps) => {
  const { openModal, closeModal } = useModal();

  const handleSendViaMessage = () => {
    openModal(<ShareTweetModal tweet={tweet} closeModal={closeModal} />);
  };

  return (
    <button
      onClick={handleSendViaMessage}
      className="flex flex-row hover:bg-gray-lightest font-bold"
    >
      <div className="flex flex-row py-3 px-4 items-center">
        <div className="mr-2">
          <MessagesIcon isActive={false} className={"w-5 h-5"} />
        </div>
        <div>
          <span>Send via Direct Message</span>
        </div>
      </div>
    </button>
  );
};

export default SendViaMessage;
