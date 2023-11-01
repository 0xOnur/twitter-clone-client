import { TweetIcon } from "@icons/Icon";
import { useModal } from "contexts/ModalContext";
import { NewTweetModal } from "@components/middleSectionComp/DialogModals/TweetModals/";

const TweetButton = () => {
  const { openModal, closeModal } = useModal();

  const handleOpenModal = () => {
    openModal(<NewTweetModal closeModal={closeModal} />);
  };

  return (
    <button
      onClick={handleOpenModal}
      className="flex w-full items-center  my-4 "
    >
      <div className="sm:visible lg:hidden w-full">
        <div className="flex w-full justify-center">
          <div className="flex items-center justify-center min-w-52px min-h-52px px-2 bg-[color:var(--color-primary)] hover:opacity-90 shadow-lg rounded-full ">
            <TweetIcon className="w-7 h-7 text-white" />
          </div>
        </div>
      </div>
      <div className="hidden lg:inline-block w-90%">
        <div className="flex items-center justify-center min-w-52px min-h-52px w-full h-full bg-[color:var(--color-primary)] hover:opacity-90 rounded-full">
          <span className="text-white text-[17px] font-bold">Tweet</span>
        </div>
      </div>
    </button>
  );
};

export default TweetButton;
