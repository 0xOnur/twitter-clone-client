import MessageTextInput from "./MessageTextInput";
import ReplyingMessage from "./ReplyingMessage";
import React, { useState } from "react";
import ChatToolbar from "./ChatToolbar";
import SendButton from "./SendButton";

interface IProps {
  conversationId: string;
}

const ChatComposer = ({ conversationId }: IProps) => {
  const [messageText, setMessageText] = useState("");

  return (
    <div className="border-t bg-white pb-2">
      {/* replying message */}
       <ReplyingMessage />

      {/* progress section */}
      <div className="loader w-full opacity-0" />

      {/* Composer */}
      <div className="flex flex-row items-center mx-3 my-1 p-1 rounded-2xl bg-gray-message">
        <ChatToolbar setMessageText={setMessageText} />
        <MessageTextInput
          messageText={messageText}
          setMessageText={setMessageText}
        />
        <SendButton messageText={messageText} conversationId={conversationId} />
      </div>
    </div>
  );
};

export default ChatComposer;
