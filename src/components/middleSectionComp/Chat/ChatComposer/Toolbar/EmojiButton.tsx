import Picker from "@emoji-mart/react";
import { EmojiIcon } from "@icons/Icon";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { Portal } from "contexts/Portal";
import { useState, useCallback, useEffect } from "react";
import { usePopper } from "react-popper";
import { useDispatch } from "react-redux";

interface IProps {
  prevText: string;
  setAction: ActionCreatorWithPayload<string>;
}

const EmojiButton = ({ prevText, setAction }: IProps) => {
  const dispatch = useDispatch();
  const [showEmoji, setShowEmoji] = useState(false);

  let [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();

  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top",
  });

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (popperElement && !popperElement.contains(e.target as Node) && !referenceElement?.contains(e.target as Node)) {
        setShowEmoji(false);
      }
    },
    [popperElement, referenceElement]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  function handleEmojiSelect(emoji: any) {
    dispatch(setAction(prevText + emoji.native));
  }

  return (
    <div className="relative">
      <button
        title="Emoji"
        ref={setReferenceElement}
        onClick={() => setShowEmoji(!showEmoji)}
        className="flex items-center min-w-[36px] min-h-[36px] rounded-full hover:bg-primary-hover duration-200 relative"
      >
        <div className="flex flex-grow justify-center items-center font-bold">
          <EmojiIcon className="w-5 h-5 fill-primary-base" />
        </div>
      </button>

      {showEmoji && (
        <Portal>
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <Picker
              onEmojiSelect={(emoji: any) => handleEmojiSelect(emoji)}
              theme={"light"}
            />
          </div>
        </Portal>
      )}
    </div>
  );
};

export default EmojiButton;
