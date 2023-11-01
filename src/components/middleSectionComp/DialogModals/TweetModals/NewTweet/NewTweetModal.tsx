import { TweetComposer } from "@components/middleSectionComp/ComposerComp";
import { CancelIcon } from "@icons/Icon";

interface IProps {
  closeModal: () => void;
}

const NewTweetModal = ({ closeModal }: IProps) => {
  return (
    <div className="z-10 bg-[color:var(--background-primary)] w-full max-w-600px rounded-xl overflow-hidden">
      <div className="overflow-y-auto max-h-90vh">
        <div className="sticky top-0 z-10 mx-4">
          <div className="flex h-[53px] items-center bg-[color:var(--background-primary-alpha)] backdrop-blur-md">
            <button
              type="button"
              onClick={closeModal}
              className="p-2 hover:bg-[color:var(--background-third)] rounded-full"
            >
              <CancelIcon className={"w-5 h-5"} />
            </button>
          </div>
        </div>
        <div>
          <div className="flex flex-col py-1">
            <div className="h-full px-4">
              <TweetComposer composerMode="tweet" onClose={closeModal} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTweetModal;
