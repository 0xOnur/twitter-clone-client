import useDeleteConversation from "@hooks/Chat/Mutations/useDeleteConversation";
import usePinMutation from "@hooks/Chat/Mutations/usePinMutation";
import { TrashIcon, PinIcon, UnpinIcon } from "@icons/Icon";
import { useCallback, useEffect, useRef } from "react";

interface IProps {
  chatId: string;
  isPinned: boolean;
  setOpenMore: React.Dispatch<React.SetStateAction<boolean>>
}

const MoreMenu = ({ chatId, isPinned, setOpenMore }: IProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  const {setPin, unsetPin} = usePinMutation({chatId: chatId})
  const {mutate} = useDeleteConversation()

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


  const handlePin = () => {
    if(isPinned) {
      unsetPin.mutate(chatId)
    }else {
      setPin.mutate(chatId)
    }
  }

  return (
    <div ref={menuRef} className="absolute right-3 top-3 z-10">
      <div className="flex flex-col bg-white border rounded-xl overflow-hidden shadow">
        <button
          onClick={handlePin}
          className="flex flex-row gap-2 py-3 px-4 items-center border-b hover:bg-gray-dropdown"
        >
          {isPinned ? (
            <>
              <UnpinIcon className="w-5 h-5" />
              <span className="font-bold"> Unpin conversation</span>
            </>
          ) : (
            <>
              <PinIcon className="w-5 h-5" />
              <span className="font-bold"> Pin conversation</span>
            </>
          )}
        </button>
        <button
          onClick={() => mutate(chatId)}
          className="flex flex-row gap-2 py-3 px-4 items-center hover:bg-gray-dropdown"
        >
            <TrashIcon className="w-5 h-5 fill-red-removeText" />
            <span className="font-bold text-red-removeText">Delete conversation</span>
        </button>
      </div>
    </div>
  );
};

export default MoreMenu;
