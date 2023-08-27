import useAutosizeTextArea from "@hooks/composer/useAutosizeTextArea";
import React, { useCallback, useRef } from "react";

interface IProps {
  messageContent: string;
  setMessageContent: React.Dispatch<React.SetStateAction<string>>;
}

const MessageTextInput = ({
  messageContent,
  setMessageContent,
}: IProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef, messageContent);

  const handleMessageChange = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessageContent((prevContent) => {
        return evt.target.value;
      })

    },
    [setMessageContent]
  );


  return (
    <div className="flex flex-grow shrink self-center">
      <div className="flex grow z-10 w-full">
        <div className="w-full py-1 p-3">
          <textarea
            className="focus:outline-none resize-none block w-full bg-transparent text-black"
            placeholder={"Start a new message"}
            onChange={handleMessageChange}
            value={messageContent}
            ref={textAreaRef}
            maxLength={280}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default MessageTextInput;
