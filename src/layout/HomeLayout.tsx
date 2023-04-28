import React from "react";
import { MiddleSection, RightSideBar, LeftSideBar } from "@components/index";

const HomeLayout = () => {
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto sticky">
      <LeftSideBar.LeftSideBar />
      <div className="flex w-full">
        <MiddleSection.HomeFeed />
        <RightSideBar.RightSidebar />
      </div>
    </div>
  );
};

export default React.memo(HomeLayout);
