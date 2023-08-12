import useAutosizeTextArea from "@hooks/composer/useAutosizeTextArea";
import React, { useCallback, useRef } from "react";

type Props = {
  messageText: string;
  setMessageText: React.Dispatch<React.SetStateAction<string>>;
};

const MessageTextInput = ({
  messageText,
  setMessageText,
}: Props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef, messageText);

  const handleMessageChange = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessageText(evt.target.value);
    },
    [setMessageText]
  );


  return (
    <div className="flex flex-grow shrink self-center">
      <div className="flex grow z-10 w-full">
        <div className="w-full py-1 p-3">
          <textarea
            className="focus:outline-none resize-none block w-full bg-transparent text-black"
            placeholder={"Start a new message"}
            onChange={handleMessageChange}
            value={messageText}
            ref={textAreaRef}
            maxLength={280}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageTextInput;
