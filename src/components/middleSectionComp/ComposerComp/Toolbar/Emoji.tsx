import { ComposerState, setTweetText } from "@redux/slices/composerSlice";
import React, { useState, useCallback, useEffect } from "react";
import Picker from "@emoji-mart/react";
import { EmojiIcon } from "@icons/Icon";
import { useDispatch } from "react-redux";
import { usePopper } from "react-popper";
import { Portal } from "contexts/Portal";

interface IProps {
  composer: ComposerState;
}

const Emoji: React.FC<IProps> = ({ composer }) => {
  const dispatch = useDispatch();
  const [showEmoji, setShowEmoji] = useState(false);

  let [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();

  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
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
    const tweetText = composer.tweetText + emoji.native;
    dispatch(setTweetText(tweetText));
  }

  return (
    <div className="relative">
      <button
        title="Emoji"
        ref={setReferenceElement}
        onClick={() => setShowEmoji(!showEmoji)}
        className="relative w-fit p-2 group"
      >
        <div className="absolute left-0 top-0 w-full h-full rounded-full opacity-30 group-hover:bg-[color:var(--color-secondary)]" />
        <span className="w-8 h-8">
          <EmojiIcon className="w-5 h-5 text-[color:var(--color-primary)]" />
        </span>
      </button>

      <div>
        {showEmoji && (
          <Portal>
            <div
            className="z-30"
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              <Picker
                onEmojiSelect={(emoji: any) => handleEmojiSelect(emoji)}
              />
            </div>
          </Portal>
        )}
      </div>
    </div>
  );
};

export default React.memo(Emoji);
