import React, { useState } from "react";
import ChatToolbar from "./ChatToolbar";
import MessageTextInput from "./MessageTextInput";
import SendButton from "./SendButton";

interface IProps {
  conversationId: string;
}

const ChatComposer = ({conversationId}: IProps) => {
    const [messageText, setMessageText] = useState("")

  return (
    <div className="border-t bg-white">
      {/* progress section */}
      <div className="loader w-full opacity-0" />
      {/* composer section */}
      <div className="flex flex-row items-center mx-3 my-1 p-1 rounded-2xl bg-gray-message">
        {/* media, gif and emotion buttons */}
        <ChatToolbar />
        {/* input section */}
       <MessageTextInput
         messageText={messageText}  
         setMessageText={setMessageText}
        />
        {/* send button */}
        <SendButton
          messageText={messageText}
          conversationId={conversationId}
        />
      </div>
    </div>
  );
};

export default ChatComposer;
