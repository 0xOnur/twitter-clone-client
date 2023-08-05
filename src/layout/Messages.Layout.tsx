import React from "react";
import { LeftSideBar } from "@components/leftSidebarComp";
import { Messages } from "@components/middleSectionComp";

const MessagesLayout = () => {
  return (
    <div>
      <div className="flex min-h-screen max-w-7xl mx-auto sticky">
        <LeftSideBar />
        <div className="flex flex-row gap-5 min-h-full w-full">
          <Messages/>
        </div>
      </div>
    </div>
  );
};

export default MessagesLayout;
