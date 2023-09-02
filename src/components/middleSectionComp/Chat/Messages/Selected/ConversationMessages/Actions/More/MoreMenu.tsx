import { useRef, useCallback, useEffect } from "react";
import DeleteMessage from "./DeleteMessage";
import ReplyMessage from "./ReplyMessage";
import CopyMessage from "./CopyMessage";
import classNames from "classnames";

interface IProps {
  isMine: boolean;
  message: IMessage;
  setOpenMore: React.Dispatch<React.SetStateAction<boolean>>;
}

const MoreMenu = ({ isMine, message, setOpenMore }: IProps) => {
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

  const menuClassNames = classNames("absolute z-10 top-0 w-max", {
    "right-0": isMine,
    "left-0": !isMine,
  })

  return (
    <div ref={menuRef} className={menuClassNames}>
      <div className="flex flex-col bg-white border rounded-xl overflow-hidden shadow-xl">
       <ReplyMessage
        message={message}
        setOpenMore={setOpenMore}
       />

        <CopyMessage message={message} setOpenMore={setOpenMore} />

        <DeleteMessage messageId={message?._id!} setOpenMore={setOpenMore} />
      </div>
    </div>
  );
};

export default MoreMenu;
