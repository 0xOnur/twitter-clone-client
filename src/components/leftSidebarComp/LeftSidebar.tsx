import { RootState } from "redux/config/store";
import { useSelector } from "react-redux";
import TweetButton from "./TweetButton";
import UserBox from "./UserBox";
import Tabs from "./Tabs";
import Bird from "./Bird";

const LeftSideBar = () => {
  const reduxUser = useSelector((state: RootState) => state.user);

  return (
    <header className="h-screen sticky top-0 flex flex-col grow-1 items-end z-50">
      <div className="lg:w-275px min-w-88px">
        <div className="h-screen overflow-y-auto">
          <div className="flex flex-col lg:w-275px min-w-88px justify-between h-full px-2 items-center">
            <div className="flex flex-col lg:items-start items-center w-full">
              <Bird />

              <Tabs reduxUser={reduxUser} />

              {reduxUser.isAuthenticated && <TweetButton />}
            </div>
            {reduxUser.isAuthenticated && <UserBox />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default LeftSideBar;
