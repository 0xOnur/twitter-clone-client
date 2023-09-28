import useSendMessage from "@hooks/Chat/Mutations/useSendMessage";
import { clearReplyMessage, selectReplyMessage } from "@redux/slices/chatSlice";
import MessageTextInput from "./MessageTextInput";
import ReplyingMessage from "./ReplyingMessage";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import ChatToolbar from "./ChatToolbar";
import SendButton from "./SendButton";
import Media from "./Media";
import { TenorImage } from "gif-picker-react";

interface IProps {
  conversationId: string;
}

const ChatComposer = ({ conversationId }: IProps) => {
  const dispatch = useDispatch();

  const replyMessage = useSelector(selectReplyMessage);
  const [messageContent, setMessageContent] = useState("");

  const [tenorGif, setTenorGif] = useState<TenorImage>();
  const [messageMedia, setMessageMedia] = useState({
    mediaFile: new File([], ""),
    mediaURL: "",
  });

  const isMessageReady =
    messageContent.trim() !== "" || !!messageMedia.mediaURL || !!tenorGif;

  const { mutate, isLoading } = useSendMessage();

  const handleSentMessage = () => {
    const formData = new FormData();

    formData.append("chat", conversationId);
    formData.append("content", messageContent);
    replyMessage?._id && formData.append("replyTo", replyMessage?._id!);
    replyMessage?._id && formData.append("type", "reply");

    tenorGif?.url && formData.append("gif", tenorGif.url);
    messageMedia.mediaFile &&
      formData.append("chatImage", messageMedia.mediaFile);

    mutate(formData);
    dispatch(clearReplyMessage());
    setMessageContent("");
    setMessageMedia({ mediaFile: new File([], ""), mediaURL: "" });
    setTenorGif(undefined);
  };

  return (
    <div className="border-t bg-white pb-1">
      {/* replying message */}
      <ReplyingMessage />

      {/* progress section */}
      {isLoading && <div className="loader w-full" />}

      {/* Composer */}
      <div className="flex flex-col items-center mx-3 my-1 p-1 rounded-2xl bg-gray-message">
        {(messageMedia.mediaURL || tenorGif) && (
          <Media
            tenorGif={tenorGif}
            setTenorGif={setTenorGif}
            messageMedia={messageMedia}
            setMessageMedia={setMessageMedia}
          />
        )}

        <div className="flex flex-row items-center w-full">
          {!messageMedia.mediaURL && (
            <ChatToolbar
              tenorGif={tenorGif}
              setTenorGif={setTenorGif}
              messageMedia={messageMedia}
              setMessageMedia={setMessageMedia}
              setMessageContent={setMessageContent}
            />
          )}

          <MessageTextInput
            placeholder="Start a new message"
            messageContent={messageContent}
            setMessageContent={setMessageContent}
          />
          <SendButton
            isMessageReady={isMessageReady && !isLoading}
            handleSentMessage={handleSentMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatComposer;
