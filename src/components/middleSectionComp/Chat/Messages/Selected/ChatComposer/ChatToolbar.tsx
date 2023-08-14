import { GIFIcon, ImageIcon } from "@icons/Icon";
import Emoji from "./Emoji";

interface IProps {
  setMessageText:  React.Dispatch<React.SetStateAction<string>>
}

const ChatToolbar = ({setMessageText}: IProps) => {
  return (
    <div className="flex flex-row mr-1">
      <button
        title="Media"
        disabled={true}
        className="flex min-w-[36px] min-h-[36px] items-center rounded-full hover:bg-primary-hover duration-200 cursor-not-allowed"
      >
        <div className="flex flex-grow justify-center items-center font-bold">
          <ImageIcon className="w-5 h-5 fill-primary-base" />
        </div>
      </button>

      <button
        title="GIF"
        disabled={true}
        className="flex min-w-[36px] min-h-[36px] items-center rounded-full hover:bg-primary-hover duration-200 cursor-not-allowed"
      >
        <div className="flex flex-grow justify-center items-center font-bold">
          <GIFIcon className="w-5 h-5 fill-primary-base" />
        </div>
      </button>

      <Emoji setMessageText={setMessageText} />
    </div>
  );
};

export default ChatToolbar;
