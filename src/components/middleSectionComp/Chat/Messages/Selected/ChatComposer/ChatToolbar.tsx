import { EmojiIcon, GIFIcon, ImageIcon } from "@icons/Icon";

const ChatToolbar = () => {
  return (
    <div className="flex flex-row mr-1">
      <div
        role="button"
        className="flex min-w-[36px] min-h-[36px] rounded-full hover:bg-primary-hover duration-200"
      >
        <div className="flex flex-grow justify-center items-center font-bold">
          <ImageIcon className="w-5 h-5 fill-primary-base" />
        </div>
      </div>

      <div
        role="button"
        className="flex min-w-[36px] min-h-[36px] rounded-full hover:bg-primary-hover duration-200"
      >
        <div className="flex flex-grow justify-center items-center font-bold">
          <GIFIcon className="w-5 h-5 fill-primary-base" />
        </div>
      </div>

      <div
        role="button"
        className="flex min-w-[36px] min-h-[36px] rounded-full hover:bg-primary-hover duration-200"
      >
        <div className="flex flex-grow justify-center items-center font-bold">
          <EmojiIcon className="w-5 h-5 fill-primary-base" />
        </div>
      </div>
    </div>
  );
};

export default ChatToolbar;
