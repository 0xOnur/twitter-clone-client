import Picker from "@emoji-mart/react";
import { EmojiIcon } from "@icons/Icon";
import { useRef, useState, useCallback, useEffect } from "react";

interface IProps {
  setMessageText: React.Dispatch<React.SetStateAction<string>>;
}

const Emoji = ({ setMessageText }: IProps) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const emojiRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target as Node) &&
        (!emojiButtonRef.current ||
          !emojiButtonRef.current.contains(event.target as Node))
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
    setMessageText((prevTweet: string) =>
      prevTweet ? prevTweet + emoji.native : emoji.native
    );
  }

  return (
    <div className="relative">
      <button
        title="Emoji"
        ref={emojiButtonRef}
        onClick={() => setShowEmoji(!showEmoji)}
        className="flex items-center min-w-[36px] min-h-[36px] rounded-full hover:bg-primary-hover duration-200 relative"
      >
        <div className="flex flex-grow justify-center items-center font-bold">
          <EmojiIcon className="w-5 h-5 fill-primary-base" />
        </div>
      </button>
  
      {showEmoji && (
        <div
          ref={emojiRef}
          className="absolute bottom-12 z-50 left-1/2 transform -translate-x-1/2 shadow-md"
        >
         <Picker
          onEmojiSelect={(emoji: any) => handleEmojiSelect(emoji)}
          theme={"light"}
        />
        </div>
      )}
    </div>
  );
};

export default Emoji;
