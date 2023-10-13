import { useSelector } from "react-redux";
import { RootState } from "redux/config/store";
import { TweetIcon, TwitterIcon } from "@icons/Icon";
import UserBox from "./UserBox";
import Tabs from "./Tabs";

const LeftSideBar = () => {
  const reduxUser = useSelector((state: RootState) => state.user);

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

              <Tabs reduxUser={reduxUser} />

              {reduxUser.isAuthenticated && (
                <>
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
                </>
              )}
            </div>
            {reduxUser.isAuthenticated && <UserBox />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default LeftSideBar;
