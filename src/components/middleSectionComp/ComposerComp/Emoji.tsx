import React, { useState, useRef, useCallback, useEffect } from "react";
import Picker from "@emoji-mart/react";
import { EmojiIcon } from "@icons/Icon";

interface IProps {
  setTweet: React.Dispatch<React.SetStateAction<string>>;
}

const Emoji: React.FC<IProps> = ({ setTweet }) => {
  const [showEmoji, setShowEmoji] = useState(false);

  const emojiRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target as Node) &&
        (!emojiButtonRef.current ||
          !emojiButtonRef.current.contains(event.target as Node)
        )
      ) {
        setShowEmoji(false);
      }
    },
    [emojiRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);

  function handleEmojiSelect(emoji: any) {
    setTweet((prevTweet: string) =>
      prevTweet ? prevTweet + emoji.native : emoji.native
    );
  }

  return (
    <div>
      <button
        ref={emojiButtonRef}
        type="button"
        onClick={() => setShowEmoji(!showEmoji)}
        className="p-2 hover:bg-primary-extraLight w-fit rounded-full cursor-pointer"
      >
        <label className="cursor-pointer w-8 h-8">
          <EmojiIcon className={"w-5 h-5 text-primary-base fill-current"} />
        </label>
      </button>
      {showEmoji && (
        <div ref={emojiRef} className="absolute shadow-xl z-10">
          <Picker
            onEmojiSelect={(emoji: any) => handleEmojiSelect(emoji)}
            theme={"light"}
            title="Pick your emoji"
            emoji="point_up"
          />
        </div>
      )}
    </div>
  );
};

export default Emoji;
