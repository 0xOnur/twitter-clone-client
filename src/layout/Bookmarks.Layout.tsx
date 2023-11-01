import React from "react";
import { RightSidebar, LeftSideBar, Bookmarks } from "@components/index";

interface IProps {
  isAuthenticated: boolean;
}

const BookmarksLayout = ({ isAuthenticated }: IProps) => {
  return (
      <div className="flex min-h-screen max-w-7xl mx-auto sticky">
        <LeftSideBar />
        <div className="flex flex-row gap-5 min-h-full w-full">
          <Bookmarks />
          <RightSidebar isAuthenticated={isAuthenticated} />
        </div>
      </div>
  );
};

export default BookmarksLayout;
