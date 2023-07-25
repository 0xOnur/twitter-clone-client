import React from "react";
import Conversations from "./Conversations";
import Messages from "./Messages";

const MessagesPage = () => {
  return (
    <div className="flex flex-row max-w-[990px] w-full">
      <div className="w-full max-w-600px min-w-[320px] md:w-[390px] xl:w-[390px]">
        <Conversations />
      </div>
      <div className="border-r w-full max-w-600px  hidden md:inline-block">
        <Messages />
      </div>
    </div>
  );
};

export default MessagesPage;
