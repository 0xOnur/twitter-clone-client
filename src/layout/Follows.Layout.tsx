import React from "react";
import { RightSidebar, LeftSideBar } from "@components/index";
import {Follows} from "@components/middleSectionComp/UserProfile"

interface IProps {
  isAuthenticated: boolean;
  followsTab: "followers" | "following"
}

const FollowsLayout = ({ isAuthenticated, followsTab }: IProps) => {
  return (
    <div>
      <div className="flex min-h-screen max-w-7xl mx-auto sticky">
        <LeftSideBar />
        <div className="flex flex-row gap-5 min-h-full w-full">
          <Follows isAuthenticated={isAuthenticated} followsTab={followsTab} />
          <RightSidebar isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </div>
  );
};

export default FollowsLayout;
