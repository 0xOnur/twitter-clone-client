import useAutosizeTextArea from "@hooks/Composer/useAutosizeTextArea";
import React, {useRef, useCallback} from 'react'
import { useDispatch } from "react-redux";
import { ComposerState, setTweetText } from "@redux/slices/composerSlice";

type Props = {
    composer: ComposerState;
    composerMode: string | undefined;
}

const TextArea = ({composer, composerMode}:Props) => {
  const dispatch = useDispatch();

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef, composer.tweetText);
  
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
            value={composer.tweetText}
            onChange={handleTweetChange}
            maxLength={composer.textLimit}
        />
        </div>
    </div>
  )
}

export default TextArea;