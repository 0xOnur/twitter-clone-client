import useUndoRetweetMutation from "@hooks/Tweet/Mutations/useUndoRetweetMutation";
import useRetweetMutation from "@hooks/Tweet/Mutations/useRetweetMutation";
import { TweetModals } from "@components/middleSectionComp/DialogModals";
import { QuoteIcon, ReTweetIcon } from "@icons/Icon";
import { useModal } from "contexts/ModalContext";

interface IProps {
  tweet: ITweet;
  onClose: () => void;
  isReteeted: boolean;
}

const ReTweetMenu = ({ tweet, onClose, isReteeted }: IProps) => {
  const { retweetMutate } = useRetweetMutation();
  const { undoRetweetMutate } = useUndoRetweetMutation();
  
  const { openModal, closeModal } = useModal();

  const handleQuote = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClose();
    openModal(
      <TweetModals.ReplyQuoteModal
        composerMode={"quote"}
        tweet={tweet}
        closeModal={closeModal}
      />
    );
  };

  const handleRetweet = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose();
      if (isReteeted) {
        undoRetweetMutate(tweet._id);
      } else {
        retweetMutate(tweet._id);
      }
  };

  return (
    <div
      className="overflow-hidden w-max rounded-2xl shadow-box bg-[color:var(--background-primary)]"
    >
      <div className="flex flex-col">
        <button
          onClick={handleRetweet}
          className="flex flex-row font-bold hover:bg-[color:var(--background-third)]"
        >
          <div className="flex flex-row py-3 px-4 items-center">
            <div className="mr-2">
              <ReTweetIcon className={"w-5 h-5"} />
            </div>
            <div>
              {isReteeted ? <span>Undo Retweet</span> : <span>Retweet</span>}
            </div>
          </div>
        </button>

        <button
          onClick={handleQuote}
          className="flex flex-row font-bold hover:bg-[color:var(--background-third)]"
        >
          <div className="flex flex-row py-3 px-4 items-center">
            <div className="mr-2">
              <QuoteIcon className={"w-5 h-5"} />
            </div>
            <div>
              <span>Quote Tweet</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ReTweetMenu;
