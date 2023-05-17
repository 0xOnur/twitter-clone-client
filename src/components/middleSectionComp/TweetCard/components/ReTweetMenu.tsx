import React, { useRef, useEffect, useCallback } from "react";
import { ReTweetIcon } from "@icons/Icon";

interface IProps {
  setComposerMode: React.Dispatch<React.SetStateAction<"reply" | "quote">>;
  setQuoteModal: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
}

const ShareMenu = ({ onClose, setQuoteModal, setComposerMode }: IProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose();
    const actionName = e.currentTarget.name;
    switch (actionName) {
      case "retweet":
        console.log(actionName);
        break;
      case "quote":
        setComposerMode("quote");
        setQuoteModal(true);
        break;
      default:
        break;
    }
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
      className="absolute z-10 top-0 -right-3 w-max border bg-white rounded-2xl shadow-lg"
    >
      <div className="flex flex-col">
        <button
          onClick={handleClick}
          name="retweet"
          className="flex flex-row hover:bg-gray-lightest rounded-t-2xl font-bold"
        >
          <div className="flex flex-row py-3 px-4 items-center">
            <div className="mr-2">
              <ReTweetIcon className={"w-5 h-5"} />
            </div>
            <div>
              <span>Retweet</span>
            </div>
          </div>
        </button>

        <button
          onClick={handleClick}
          name="quote"
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

export default ShareMenu;
