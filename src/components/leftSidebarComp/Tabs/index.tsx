import NotificationsTab from "./NotificationsTab";
import { UserState } from "@redux/slices/userSlice";
import { useLocation } from "react-router-dom";
import BookmarksTab from "./BookmarksTab";
import MessagesTab from "./MessagesTab";
import ProfileTab from "./ProfileTab";
import MoreButton from "./MoreButton";
import ExploreTab from "./ExploreTab";
import HomeTab from "./HomeTab";

interface IProps {
  reduxUser: UserState;
}

const Tabs = ({ reduxUser }: IProps) => {
  const location = useLocation();

  return (
    <div className="flex flex-col w-full mt-0.5 mb-1 z-10">
      <nav className="flex flex-col lg:items-start sm:items-center">
        <HomeTab isActive={location.pathname.includes("home")} />
        <ExploreTab isActive={location.pathname.includes("explore")} />

        {reduxUser.isAuthenticated && (
          <div className="w-full">
            <NotificationsTab
              isActive={location.pathname.includes("notifications")}
              reduxUser={reduxUser}
            />
            <MessagesTab
              isActive={location.pathname.includes("messages")}
              reduxUser={reduxUser}
            />
            <BookmarksTab isActive={location.pathname.includes("bookmarks")} />
            <ProfileTab
              isActive={location.pathname.includes(reduxUser.user?.username!)}
              reduxUser={reduxUser}
            />
            <MoreButton />
          </div>
        )}
      </nav>
    </div>
  );
};

export default Tabs;
