import React from "react";
import { Notifications } from "@components/middleSectionComp";
import { LeftSideBar } from "@components/leftSidebarComp";
import { RightSidebar } from "@components/rightSidebarComp";

interface IProps {
  isAuthenticated: boolean;
}

const NotificationsLayout = ({ isAuthenticated }: IProps) => {
  return (
    <div>
      <div className="flex min-h-screen max-w-7xl mx-auto sticky">
        <LeftSideBar />
        <div className="flex flex-row gap-5 min-h-full w-full">
          <Notifications />
          <RightSidebar isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </div>
  );
};

export default NotificationsLayout;
