import { TrashIcon } from "@icons/Icon";
import { useRef, useCallback, useEffect } from "react";
import CopyMessage from "./CopyMessage";
import ReplyMessage from "./ReplyMessage";

interface IProps {
  isMine: boolean;
  message: IMessage;
  setOpenMore: React.Dispatch<React.SetStateAction<boolean>>;
}

const MoreMenu = ({ message, setOpenMore }: IProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMore(false);
      }
    },
    [menuRef, setOpenMore]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);

  return (
    <div ref={menuRef} className="absolute z-10 top-0 left-0 w-max">
      <div className="flex flex-col bg-white border rounded-xl overflow-hidden shadow-xl">
       <ReplyMessage
        message={message}
        setOpenMore={setOpenMore}
       />

        <CopyMessage message={message} setOpenMore={setOpenMore} />

        <button className="flex flex-row items-center w-full py-3 px-4 hover:bg-gray-dropdown duration-200">
          <div className="flex pr-3 justify-center">
            <TrashIcon className="w-5 h-5" />
          </div>
          <div className="flex shrink grow w-full">
            <span className="font-bold">Delete for you</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default MoreMenu;
