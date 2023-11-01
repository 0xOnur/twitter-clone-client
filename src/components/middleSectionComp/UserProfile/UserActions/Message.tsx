import React from "react";
import { MessagesIcon } from "@icons/Icon";

const Message = () => {
  return (
    <div className="max-h-[36px] max-w-[36px] h-full w-full relative">
      <button
        className="cursor-not-allowed p-2 border-2 border-[color:var(--background-third)] rounded-full hover:bg-[color:var(--background-third)] duration-200"
      >
        <MessagesIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Message;
