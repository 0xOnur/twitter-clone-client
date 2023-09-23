import React, { useRef, useEffect, useCallback } from "react";
import { DigalogModals } from "@components/middleSectionComp";
import { useModal } from "contexts/ModalContext";
import { ReTweetIcon } from "@icons/Icon";

interface IProps {
  tweet: ITweet;
  onClose: () => void;
  handleRetweet: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isReteeted: boolean;
}

const ReTweetMenu = ({ tweet, onClose, handleRetweet, isReteeted }: IProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { openModal, closeModal } = useModal();

  const handleQuote = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClose();
    openModal(
      <DigalogModals.ReplyQuoteModal
        composerMode={"quote"}
        tweet={tweet}
        closeModal={closeModal}
      />
    );
  };

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    },
    [menuRef, onClose]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);

  return (
    <div
      ref={menuRef}
      className="absolute z-10 -top-2 -right-3 w-max border bg-white rounded-2xl shadow-lg"
    >
      <div className="flex flex-col">
        <button
          onClick={handleRetweet}
          className="flex flex-row hover:bg-gray-lightest rounded-t-2xl font-bold"
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
          className="flex flex-row hover:bg-gray-lightest rounded-b-2xl font-bold"
        >
          <div className="flex flex-row py-3 px-4 items-center">
            <div className="mr-2">
              <ReTweetIcon className={"w-5 h-5"} />
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
