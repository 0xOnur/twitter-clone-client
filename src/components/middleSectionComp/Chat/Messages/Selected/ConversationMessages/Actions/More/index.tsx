import { TreeDotIcon } from "@icons/Icon";
import MoreMenu from "./MoreMenu";
import { Portal } from "contexts/Portal";
import React, { useState } from "react";
import { usePopper } from "react-popper";

interface IProps {
  isMine: boolean;
  message: IMessage;
  isOpenMore: boolean;
  setOpenMore: React.Dispatch<React.SetStateAction<boolean>>;
}

const MoreButton = ({ isMine, message, isOpenMore, setOpenMore }: IProps) => {
  let [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();

  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: isMine ? "top-end" : "top-start",
  });

  return (
    <div className="relative">
      <button
        ref={setReferenceElement}
        title="More"
        onClick={() => {
          setOpenMore(true);
        }}
      >
        <div className="flex justify-center min-w-[36px] min-h-[36px] relative">
          <div className="absolute inset-0 w-full h-full hover:bg-[color:var(--color-primary)] opacity-10 duration-200 rounded-full" />
          <div className="flex grow font-bold text-center items-center justify-center">
            <TreeDotIcon className="w-5 h-5 text-[color:var(--color-base-secondary)]" />
          </div>
        </div>
      </button>

      {isOpenMore && (
        <Portal>
          <div
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <MoreMenu
              isMine={isMine}
              message={message}
              setOpenMore={setOpenMore}
            />
          </div>
        </Portal>
      )}
    </div>
  );
};

export default MoreButton;
