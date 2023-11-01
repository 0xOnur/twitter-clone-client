import React, { useState, useEffect, useCallback } from "react";
import { RootState } from "@redux/config/store";
import { useSelector } from "react-redux";
import { TreeDotIcon } from "@icons/Icon";
import { Portal } from "contexts/Portal";
import { usePopper } from "react-popper";
import Menu from "./Menu";

interface IProps {
  isAuthenticated?: boolean;
  tweet: ITweet;
}

const MoreMenu = ({ isAuthenticated, tweet }: IProps) => {
  const reduxUser = useSelector((state: RootState) => state.user);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  let [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();

  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "left-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, -30],
        },
      },
    ],
  });

  const onClose = () => {
    setShowMoreMenu(false);
  };

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (
        popperElement &&
        !popperElement.contains(e.target as Node) &&
        !referenceElement?.contains(e.target as Node)
      ) {
        onClose();
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
    <div>
      <button
        title="More"
        ref={setReferenceElement}
        onClick={(e) => {
          e.stopPropagation();
          setShowMoreMenu(true);
        }}
        className="group h-5 min-h-max"
      >
        <div className="flex flex-row">
          <div className="relative">
            <div className="absolute top-0 right-0 left-0 bottom-0 -m-2 opacity-30 rounded-full group-hover:bg-[color:var(--color-primary)] duration-150" />
            <TreeDotIcon className={"w-5 h-5 text-[color:var(--color-base-secondary)] group-hover:text-[color:var(--color-primary)]"} />
          </div>
        </div>
      </button>

      {showMoreMenu && (
        <Portal>
          <div
            className="z-50"
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <Menu
              tweet={tweet}
              closeMenu={onClose}
              reduxUser={reduxUser}
              isAuthenticated={isAuthenticated}
            />
          </div>
        </Portal>
      )}
    </div>
  );
};

export default MoreMenu;
