import usePinMutation from "@hooks/Chat/Mutations/usePinMutation";
import { PinIcon, UnpinIcon } from "@icons/Icon";
import React from "react";

interface IProps {
  chatId: string;
  isPinned: boolean;
}

const PinChat = ({ chatId, isPinned }: IProps) => {
  const { setPin, unsetPin } = usePinMutation({ chatId: chatId });

  const handlePin = () => {
    if (isPinned) {
      unsetPin.mutate(chatId);
    } else {
      setPin.mutate(chatId);
    }
  };
  return (
    <button
      onClick={handlePin}
      className="flex flex-row gap-2 py-3 px-4 items-center hover:bg-[color:var(--background-secondary)]"
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
  );
};

export default PinChat;
