import useAutosizeTextArea from "@hooks/Composer/useAutosizeTextArea";
import React, {useRef, useCallback} from 'react'
import { useDispatch } from "react-redux";
import { setTweetText } from "@redux/slices/composerSlice";

type Props = {
    tweetText: string;
    composerMode: string | undefined;
}

const TextArea = ({tweetText, composerMode}:Props) => {
  const dispatch = useDispatch();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef, tweetText);
  
  const handleTweetChange = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(setTweetText(evt.target.value));
    },[dispatch]
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
                : composerMode === "quote"
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