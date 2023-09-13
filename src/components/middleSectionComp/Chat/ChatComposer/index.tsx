import useSendMessage from "@hooks/Chat/Mutations/useSendMessage";
import { clearReplyMessage, selectReplyMessage } from "@redux/slices/chatSlice";
import MessageTextInput from "./MessageTextInput";
import ReplyingMessage from "./ReplyingMessage";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ChatToolbar from "./ChatToolbar";
import SendButton from "./SendButton";

interface IProps {
  conversationId: string;
}

const ChatComposer = ({ conversationId }: IProps) => {
  const dispatch = useDispatch();
  const replyMessage = useSelector(selectReplyMessage);
  const [messageContent, setMessageContent] = useState("");

  const { mutate, isLoading } = useSendMessage();

  const handleSentMessage = () => {
    const formData = new FormData();

    formData.append("chat", conversationId);
    formData.append("content", messageContent);
    replyMessage?._id && formData.append("replyTo", replyMessage?._id!);
    replyMessage?._id && formData.append("type", "reply");

    mutate(formData)
    dispatch(clearReplyMessage());
    setMessageContent("");
  };

  return (
    <div className="border-t bg-white pb-1">
      {/* replying message */}
      <ReplyingMessage />

      {/* progress section */}
      {isLoading && <div className="loader w-full" />}

      {/* Composer */}
      <div className="flex flex-row items-center mx-3 my-1 p-1 rounded-2xl bg-gray-message">
        <ChatToolbar setMessageContent={setMessageContent} />
        <MessageTextInput
        placeholder="Start a new message"
          messageContent={messageContent}
          setMessageContent={setMessageContent}
        />
        <SendButton
          messageContent={messageContent}
          handleSentMessage={handleSentMessage}
        />
      </div>
    </div>
  );
};

export default ChatComposer;
