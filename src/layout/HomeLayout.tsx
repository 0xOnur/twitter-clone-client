import React from "react";
import { Feed, RightSidebar, LeftSideBar } from "@components/index";

const HomeLayout = () => {
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto sticky">
      <LeftSideBar />
      <div className="flex w-full">
        <Feed.HomeFeed />
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomeLayout;
