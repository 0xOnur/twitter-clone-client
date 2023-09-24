import { useCallback, useEffect, useRef } from "react";
import LeaveChat from "./LeaveChat";
import PinChat from "./PinChat";

interface IProps {
  chatId: string;
  isPinned: boolean;
  setOpenMore: React.Dispatch<React.SetStateAction<boolean>>;
}

const MoreMenu = ({ chatId, isPinned, setOpenMore }: IProps) => {
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
    <div ref={menuRef} className="absolute right-3 top-3 z-10">
      <div className="flex flex-col bg-white border rounded-xl overflow-hidden shadow">
        <PinChat chatId={chatId} isPinned={isPinned} />
        <LeaveChat chatId={chatId} />
      </div>
    </div>
  );
};

export default MoreMenu;
