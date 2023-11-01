import { EveryoneIcon, MentionIcon, TwiiterCircleIcon } from "@icons/Icon";
import React, { useState, useEffect, useCallback } from "react";
import CanReplyMenu from "./CanReplyMenu";
import { usePopper } from "react-popper";
import { Portal } from "contexts/Portal";

interface IProps {
  composerSettings: {
    audience: "everyone" | "specificUsers";
    whoCanReply: "everyone" | "following" | "mentioned";
  };
}

const ChooseCanReply: React.FC<IProps> = ({ composerSettings }) => {
  const [showMenu, setShowMenu] = useState(false);

  let [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();

  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
  });

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (
        popperElement &&
        !popperElement.contains(e.target as Node) &&
        !referenceElement?.contains(e.target as Node)
      ) {
        setShowMenu(false);
      }
    },
    [popperElement, referenceElement]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <div className="relative">
      <div className="pb-3">
        <button
          ref={setReferenceElement}
          type="button"
          onClick={() => setShowMenu(!showMenu)}
          className="rounded-full inline-flex items-center px-3 cursor-pointer hover:bg-[color:var(--background-third)] duration-150"
        >
          <span className="mr-1 [color:var(--color-primary)]">
            {composerSettings.whoCanReply === "everyone" ? (
              <EveryoneIcon className={"w-4 h-4"} />
            ) : composerSettings.whoCanReply === "following" ? (
              <TwiiterCircleIcon className={"w-4 h-4"} />
            ) : (
              <MentionIcon className={"w-4 h-4"} />
            )}
          </span>
          <span className="text-sm font-bold py-1 text-[color:var(--color-primary)]">
            {composerSettings.whoCanReply === "everyone"
              ? "Everyone"
              : composerSettings.whoCanReply === "following"
              ? "People you follow"
              : "Only people you mention"}{" "}
            can reply
          </span>
        </button>
      </div>
      {showMenu && (
        <Portal>
          <div
            className="z-30"
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <CanReplyMenu
              composerSettings={composerSettings}
              onClose={() => setShowMenu(false)}
            />
          </div>
        </Portal>
      )}
    </div>
  );
};

export default ChooseCanReply;
