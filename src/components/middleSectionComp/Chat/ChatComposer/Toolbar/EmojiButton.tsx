import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useState, useCallback, useEffect } from "react";
import Picker from "@emoji-mart/react";
import { EmojiIcon } from "@icons/Icon";
import { Portal } from "contexts/Portal";
import { usePopper } from "react-popper";
import { useDispatch } from "react-redux";

interface IProps {
  prevText: string;
  setAction: ActionCreatorWithPayload<string>;
}

const EmojiButton = ({ prevText, setAction }: IProps) => {
  const dispatch = useDispatch();
  const [showEmoji, setShowEmoji] = useState(false);

  let [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();

  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top",
  });

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (
        popperElement &&
        !popperElement.contains(e.target as Node) &&
        !referenceElement?.contains(e.target as Node)
      ) {
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
        className="relative w-fit p-2 group"
      >
        <div className="absolute inset-0 w-full h-full rounded-full group-hover:bg-[color:var(--color-primary)] opacity-10" />
        <span className="w-8 h-8">
          <EmojiIcon className="w-5 h-5 text-[color:var(--color-primary)]" />
        </span>
      </button>

      {showEmoji && (
        <Portal>
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <Picker onEmojiSelect={(emoji: any) => handleEmojiSelect(emoji)} />
          </div>
        </Portal>
      )}
    </div>
  );
};

export default EmojiButton;
