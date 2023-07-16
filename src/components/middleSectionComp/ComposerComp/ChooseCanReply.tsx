import { EveryoneIcon, MentionIcon, TwiiterCircleIcon } from "@icons/Icon";
import React, { useState, useEffect, useRef, useCallback } from "react";
import CanReplyMenu from "./CanReplyMenu";

interface IProps {
  ComposerSettings: IComposer
}

const ChooseCanReply: React.FC<IProps> = ({ComposerSettings}) => {
  const [showMenu, setShowMenu] = useState(false);

  const replyRef = useRef<HTMLDivElement>(null);
  const replyButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (
        replyRef.current &&
        !replyRef.current.contains(event.target as Node) &&
        (!replyButtonRef.current ||
          !replyButtonRef.current.contains(event.target as Node)
        )
      ) {
        setShowMenu(false);
      }
    },
    [replyRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);

  return (
    <div className="relative border-b">
      <div className="pb-3">
        <button
          ref={replyButtonRef}
          type="button"
          onClick={() => setShowMenu(!showMenu)}
          className="text-primary-base hover:bg-primary-extraLight border border-white rounded-full inline-flex items-center px-3 cursor-pointer"
        >
          <span className="mr-1">
            {
              ComposerSettings.whoCanReply === "everyone" ? (<EveryoneIcon className={"w-4 h-4"} />) : ComposerSettings.whoCanReply === "following" ? (<TwiiterCircleIcon className={"w-4 h-4"} />) : (<MentionIcon className={"w-4 h-4"} />)
            }
          </span>
          <span className="text-sm font-bold py-1">
            {ComposerSettings.whoCanReply === "everyone" ? "Everyone" : ComposerSettings.whoCanReply=== "following" ? "People you follow" : "Only people you mention"} can reply
          </span>
        </button>
      </div>
      {showMenu && (
        <div
          ref={replyRef}
          className="absolute w-80 h-fit bg-white border rounded-2xl top-8 z-20 shadow-xl"
        >
            <CanReplyMenu ComposerSettings={ComposerSettings} onClose={() => setShowMenu(false)} />
        </div>
      )}
    </div>
  );
};

export default ChooseCanReply;
