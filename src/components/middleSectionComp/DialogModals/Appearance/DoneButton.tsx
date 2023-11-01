import React from "react";

interface IProps {
  close: () => void;
}

const DoneButton = ({ close }: IProps) => {
  return (
    <button
      onClick={close}
      className="rounded-full px-4 py-2 font-bold text-white bg-[color:var(--color-primary)] hover:opacity-90 duration-200"
    >
      Done
    </button>
  );
};

export default DoneButton;
