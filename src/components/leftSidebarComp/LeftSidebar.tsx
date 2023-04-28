import React from "react";
import {
  BookmarksIcon,
  ExploreIcon,
  HomeIcon,
  MessagesIcon,
  TweetIcon,
  NotificationsIcon,
  ProfileIcon,
  TwitterIcon,
} from "@icons/Icon";
import SideLink from "./SideLink";
import UserBox from "./UserBox";
import MoreButton from "./MoreButton";


const sideLinks = [
  {
    name: "Home",
    icon: HomeIcon,
  },
  {
    name: "Explore",
    icon: ExploreIcon,
  },
  {
    name: "Notifications",
    icon: NotificationsIcon,
  },
  {
    name: "Messages",
    icon: MessagesIcon,
  },
  {
    name: "Bookmarks",
    icon: BookmarksIcon,
  },
  {
    name: "Profile",
    icon: ProfileIcon,
  },
];

const LeftSideBar = () => {
  return (
    <header className="flex flex-col grow-1 items-end z-50">
      <div className="lg:w-275px min-w-88px">
        <div className="h-full fixed">
          <div className="flex flex-col lg:w-275px min-w-88px overflow-y-auto justify-between h-full px-2 items-center">
            <div className="flex flex-col lg:items-start items-center w-full">
              
              <div className="flex flex-col max-w-full py-0.5">
                <div className="flex flex-col min-w-32px cursor-pointer self-stretch justify-center items-center">
                  <a
                    href="/"
                    className="flex justify-center items-center min-w-52px min-h-52px hover:bg-gray-extraLight duration-200 rounded-full"
                  >
                    <TwitterIcon
                      className={"h-8 text-primary-base max-w-full "}
                    />
                  </a>
                </div>
              </div>

              <div className="flex flex-col w-full mt-0.5 mb-1">
                <nav className="flex flex-col lg:items-start sm:items-center ">
                  {sideLinks.map(({ name, icon }, index) => (
                    <SideLink key={index} name={name} Icon={icon} />
                  ))}

                  <div className="w-full">
                    <MoreButton />
                  </div>
                  
                </nav>
              </div>

              <div className="sm:visible lg:hidden my-4 w-fulll">
                <button className="min-w-52px min-h-52px px-2 text-white bg-primary-base hover:bg-primary-dark shadow-lg rounded-full ">
                  <TweetIcon />
                </button>
              </div>
              

              <div className="hidden lg:inline-block w-90% my-4">
                <button className="min-w-52px min-h-52px w-full h-full bg-primary-base hover:bg-primary-dark rounded-full">
                  <div className="flex flex-row justify-center text-center">
                    <span className="text-white font-bold">Tweet</span>
                  </div>
                </button>
              </div>
            </div>
            <UserBox />
          </div>
        </div>
      </div>
    </header>
  );
};

export default LeftSideBar;
