import { DownIcon } from "@icons/Icon";
import classNames from "classnames";
import React from "react";

interface IProps {
  inView: boolean;
  myRef: React.RefObject<HTMLDivElement>;
}

const DownScrollButton = ({ inView, myRef }: IProps) => {
  const downScrollButton = classNames(
    "flex min-w-[36px] min-h-[36px] bg-white px-4 border shadow-lg rounded-full transition-opacity",
    {
      "opacity-0": inView,
      "opacity-100": !inView,
    }
  );
  const downScrollArea = classNames(
    "flex flex-row absolute bottom-4 justify-end w-full pr-8",
    {
      "-z-10": inView,
      "z-10": !inView,
    }
  );

  const handleScroll = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (myRef.current) {
      myRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  };

  return (
    <div className={downScrollArea}>
      <button onClick={handleScroll} className={downScrollButton}>
        <div className="flex flex-row h-full items-center text-center">
          <DownIcon className="w-5 h-5 text-primary-base" />
        </div>
      </button>
    </div>
  );
};

export default DownScrollButton;
