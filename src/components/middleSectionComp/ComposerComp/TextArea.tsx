import React, {useRef, useCallback} from 'react'
import useAutosizeTextArea from "@hooks/useAutosizeTextArea";

type Props = {
    tweetText: string;
    composerMode: string | undefined;
    setTweetText: React.Dispatch<React.SetStateAction<string>>;
}

const TextArea = ({tweetText, setTweetText, composerMode}:Props) => {

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef, tweetText);
  
  
  const handleTweetChange = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTweetText(evt.target.value);
    },[setTweetText]
  );
  return (
    <div className="relative flex-grow">
        <div className="py-3">
        {/* create textarea for tweet */}
        <textarea
            className="focus:outline-none resize-none text-xl block w-full bg-transparent"
            placeholder={
                composerMode === "reply"
                ? "Tweet your reply"
                : composerMode === "retweet"
                ? "Add a comment"
                : "What's happening?"
            }
            ref={textAreaRef}
            value={tweetText}
            onChange={handleTweetChange}
            maxLength={280}
        />
        </div>
    </div>
  )
}

export default TextArea;