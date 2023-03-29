import React, { useState, useEffect, useRef, useCallback } from "react";
import { EveryoneIcon, MentionIcon, TwiiterCircleIcon } from "../../../icons/Icon";
import CanReplyMenu from "./CanReplyMenu";

interface IProps {
    whoCanReply: string;
    setCanReply: React.Dispatch<React.SetStateAction<string>>;
}

const ChooseCanReply: React.FC<IProps> = ({whoCanReply, setCanReply}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    },
    [dropdownRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative border-b">
      <div className="pb-3">
        <div
          onClick={() => setShowMenu(true)}
          className="text-primary-base hover:bg-primary-extraLight border border-white rounded-full inline-flex items-center px-3 cursor-pointer"
        >
          <span className="mr-1">
            {
              whoCanReply === "Everyone" ? (<EveryoneIcon className={"w-4 h-4"} />) : whoCanReply === "People you follow" ? (<TwiiterCircleIcon className={"w-4 h-4"} />) : (<MentionIcon className={"w-4 h-4"} />)
            }
          </span>
          <span className="text-sm font-bold py-1">
            
            {whoCanReply} can reply
          </span>
        </div>
      </div>
      {showMenu && (
        <div
          ref={dropdownRef}
          className="absolute w-80 h-fit bg-white border rounded-2xl top-8 z-20"
        >
            <CanReplyMenu whoCanReply={whoCanReply} setCanReply={setCanReply} onClose={() => setShowMenu(false)} />
        </div>
      )}
    </div>
  );
};

export default ChooseCanReply;
