import React from "react";
import { MiddleSection, RightSideBar, LeftSideBar } from "@components/index";

const HomeLayout = () => {
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto sticky gap-3 ">
      <LeftSideBar.LeftSideBar />
      <div className="flex w-full">
        <MiddleSection.MiddleSection />
        <RightSideBar.RightSidebar />
      </div>
    </div>
  );
};

export default React.memo(HomeLayout);
