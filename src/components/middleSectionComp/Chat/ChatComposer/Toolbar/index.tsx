import {  setMessageContent, ChatComposerState } from "@redux/slices/chatComposerSlice";
import EmojiButton from "./EmojiButton";
import ImageButton from "./ImageButton";
import GifButton from "./GifButton";

interface IProps {
    chatComposer: ChatComposerState;
}

const ChatToolbar = ({ chatComposer }: IProps) => {

  return (
    <div className="flex flex-row mr-1">
     <ImageButton />

      <GifButton />

      <EmojiButton prevText={chatComposer.messageContent} setAction={setMessageContent} />
    </div>
  );
};

export default ChatToolbar;
