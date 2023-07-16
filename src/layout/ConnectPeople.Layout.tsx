import React from "react";
import { RightSidebar, LeftSideBar, ConnectPeople } from "@components/index";

interface IProps {
  isAuthenticated: boolean;
}

const ConnectPeopleLayout = ({ isAuthenticated }: IProps) => {
  return (
    <div>
      <div className="flex min-h-screen max-w-7xl mx-auto sticky">
        <LeftSideBar />
        <div className="flex flex-row gap-5 min-h-full w-full">
          <ConnectPeople/>
          <RightSidebar isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </div>
  );
};

export default ConnectPeopleLayout;
