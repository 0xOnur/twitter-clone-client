import useSendMessage from "@hooks/Chat/Mutations/useSendMessage";
import { clearChatComposer, selectChatComposer } from "@redux/slices/chatComposerSlice";
import { useDispatch, useSelector } from "react-redux";
import MessageTextInput from "./MessageTextInput";
import ReplyingMessage from "./ReplyingMessage";
import ChatToolbar from "./Toolbar";
import SendButton from "./SendButton";
import Media from "./Media";

interface IProps {
  conversationId: string;
}

const ChatComposer = ({ conversationId }: IProps) => {
  const dispatch = useDispatch();
  const chatComposer = useSelector(selectChatComposer);

  const isMessageReady =
    chatComposer.messageContent.trim() !== "" ||
    !!chatComposer.messageMedia.mediaURL ||
    !!chatComposer.tenorGif;

  const { mutate, isLoading } = useSendMessage();

  const handleSentMessage = () => {
    const formData = new FormData();

    formData.append("chat", conversationId);
    formData.append("content", chatComposer.messageContent);
    chatComposer.replyMessage?._id &&
      formData.append("replyTo", chatComposer.replyMessage?._id!);
    chatComposer.replyMessage?._id && formData.append("type", "reply");

    chatComposer.tenorGif?.url &&
      formData.append("gif", chatComposer.tenorGif.url);
    chatComposer.messageMedia.mediaFile &&
      formData.append("chatImage", chatComposer.messageMedia.mediaFile);

    mutate(formData);
    dispatch(clearChatComposer());
  };

  return (
    <div className="border-2 border-[color:var(--background-third)] bg-[color:var(--background-primary)] pb-1">
      {/* replying message */}
      <ReplyingMessage replyMessage={chatComposer.replyMessage} />

      {/* progress section */}
      {isLoading && <div className="loader w-full" />}

      {/* Composer */}
      <div className="flex flex-col items-center mx-3 my-1 p-1 rounded-2xl bg-[color:var(--background-third)]">
        {(chatComposer.messageMedia.mediaURL || chatComposer.tenorGif) && (
          <Media
            tenorGif={chatComposer.tenorGif}
            messageMedia={chatComposer.messageMedia}
          />
        )}

        <div className="flex flex-row items-center w-full">
          {!chatComposer.messageMedia.mediaURL && !chatComposer.tenorGif && (
            <ChatToolbar chatComposer={chatComposer} />
          )}

          <MessageTextInput
            placeholder="Start a new message"
            messageContent={chatComposer.messageContent}
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
