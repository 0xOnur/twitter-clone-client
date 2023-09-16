import useAutosizeTextArea from "@hooks/Composer/useAutosizeTextArea";
import React, { useCallback, useRef } from "react";

interface IProps {
  isDisabled?: boolean;
  placeholder: string;
  messageContent: string;
  setMessageContent: React.Dispatch<React.SetStateAction<string>>;
}

const MessageTextInput = ({
  isDisabled,
  placeholder,
  messageContent,
  setMessageContent,
}: IProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef, messageContent);

  const handleMessageChange = useCallback(
    (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessageContent(() => {
        return evt.target.value;
      })
    },[setMessageContent]
  );

  return (
    <div className="flex flex-grow shrink self-center">
      <div className="flex grow z-10 w-full">
        <div className="w-full py-1 p-3">
          <textarea
            className="focus:outline-none resize-none block w-full bg-transparent text-black max-h-[170px]"
            onChange={handleMessageChange}
            placeholder={placeholder}
            value={messageContent}
            ref={textAreaRef}
            disabled={isDisabled}
            maxLength={1000}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default MessageTextInput;
