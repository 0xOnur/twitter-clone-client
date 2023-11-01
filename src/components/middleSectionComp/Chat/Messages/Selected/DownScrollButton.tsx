import { DownIcon } from "@icons/Icon";
import classNames from "classnames";
import React from "react";

interface IProps {
  inView: boolean;
  myRef: React.RefObject<HTMLDivElement>;
}

const DownScrollButton = ({ inView, myRef }: IProps) => {
  const downScrollButton = classNames(
    "flex min-w-[36px] min-h-[36px] bg-[color:var(--background-primary)] px-4 shadow-box rounded-full transition-opacity",
    {
      "opacity-0": inView,
      "opacity-100 hover:bg-[color:var(--background-third)] duration-200": !inView,
    }
  );
  const downScrollArea = classNames(
    "flex flex-row absolute bottom-4 justify-end right-0 pr-8",
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
        <div className="flex flex-row h-full w-full items-center justify-center">
          <DownIcon className="w-5 h-5 text-[color:var(--color-primary)]" />
        </div>
      </button>
    </div>
  );
};

export default DownScrollButton;
