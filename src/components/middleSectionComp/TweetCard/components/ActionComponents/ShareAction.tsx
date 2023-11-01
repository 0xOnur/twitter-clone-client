import React, { useState, useCallback, useEffect } from "react";
import { UserState } from "@redux/slices/userSlice";
import { ShareIcon } from "@icons/Icon";
import TweetShareMenu from "./ShareMenu";
import { Portal } from "contexts/Portal";
import { usePopper } from "react-popper";

interface IProps {
  isAuthenticated: boolean;
  reduxUser: UserState;
  tweet: ITweet;
}

const ShareAction = ({ isAuthenticated, reduxUser, tweet }: IProps) => {
  const [shareMenu, setShowShareMenu] = useState(false);

  let [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();

  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-end",
    modifiers: [{ name: "offset", options: { offset: [0, -30] } }],
  });

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (popperElement && !popperElement.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    },
    [popperElement]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);

  return (
    <div
      className="group h-5 min-h-max relative"
      role="button"
      onClick={(e) => {
        e.stopPropagation();
        setShowShareMenu(!shareMenu);
      }}
    >
      <div
        title="Share"
        className="flex flex-row"
      >
        <div className="inline-flex relative">
          <div
            ref={setReferenceElement}
            className="absolute top-0 right-0 left-0 bottom-0 rounded-full -m-2 group-hover:bg-blue-base/30 duration-150"
          />
          <ShareIcon
            className={
              "w-5 h-5 text-[color:var(--color-base-secondary)] group-hover:text-blue-base duration-150"
            }
          />
        </div>
      </div>
      {shareMenu && (
        <Portal>
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <TweetShareMenu
              isAuthenticated={isAuthenticated}
              reduxUser={reduxUser}
              tweet={tweet}
            />
          </div>
        </Portal>
      )}
    </div>
  );
};

export default ShareAction;
