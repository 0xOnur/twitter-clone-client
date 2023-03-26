import React, {useState} from 'react'
import {
  BookmarksIcon,
  ExploreIcon,
  HomeIcon,
  ListsIcon,
  MessagesIcon,
  TweetIcon,
  NotificationsIcon,
  ProfileIcon
} from "../../icons/Icon";
import SideLink from './SideLink';
import twitterLogo from "../../icons/twitter.svg";
import UserBox from './UserBox';
import MoreButton from './MoreButton';

type Link = {
  name: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

const sideLinks: Link[] = [
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
    name: "Lists",
    icon: ListsIcon,
  },
  {
    name: "Profile",
    icon: ProfileIcon,
  },
];

const LeftSideBar: React.FC = () => {

  const [active, setActive] = useState("Home");

  const handleMenuItemClick = (name:string) => {
    setActive(name);
  };

  return (
    <div className="flex flex-col text-center min-w-fit sm:ml-5 md:ml-16 lg:ml-0 h-screen overflow-y-auto lg:w-3/12 justify-between top-0">
      <div className='lg:w-5/12 min-w-full sm:w-fit '>
        <div className="mt-1 mb-4 flex items-center justify-center w-12 h-12 rounded-full hover:bg-primary-light transform transition-colors duration-200">
          <img src={twitterLogo} alt="Twitter Logo" className="w-9 h-9" />
        </div>
        <nav>
          <ul>
            {sideLinks.map(({ name, icon }) => (
              <SideLink
                key={name}
                name={name}
                Icon={icon}
                active={active}
                onMenuItemClick={handleMenuItemClick}
              />
            ))}
            <MoreButton />
          </ul>
        </nav>
        
        <button className='pl-2 sm:visible lg:hidden w-12 h-12 px-2 text-white bg-primary-base hover:bg-primary-dark shadow-lg rounded-full transform transition-colors'>
          <TweetIcon />
        </button>
        <button className="hidden lg:inline-block font-bold bg-primary-base hover:bg-primary-dark text-white shadow-lg rounded-full py-3 px-8 w-full transform transition-colors duration-200">
          Tweet
        </button>
      </div>
      <UserBox />
    </div>
  )
}

export default LeftSideBar
