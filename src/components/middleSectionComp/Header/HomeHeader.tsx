import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@redux/config/store";

type Props = {
  isForYou: boolean | undefined;
  setIsForYou: React.Dispatch<React.SetStateAction<boolean>> | undefined;
};

const HomeHeader = ({ isForYou, setIsForYou }: Props) => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  return (
    <div className="sticky top-0 z-30">
      <div className="h-auto  backdrop-blur-md bg-white/80 ">
        <div className="h-full">
          <a href="/">
            <div className=" cursor-pointer z-10 p-3">
              {isAuthenticated ? (
                <h1 className="text-2xl font-bold">Home</h1>
              ): (
                <h1 className="text-2xl font-bold">Explore</h1>
              )}
            </div>
          </a>
        </div>
        {isAuthenticated && (
          <div className="flex w-full h-14">
          <div className="w-full h-full flex col-span-2">
            <button
              onClick={() => {
                setIsForYou?.(true);
              }}
              className="flex justify-center w-full cursor-pointer hover:bg-gray-extraLight duration-150"
            >
              <div className="relative h-14 flex items-center w-fit">
                <h1 className={` ${isForYou && "font-bold"}`}>For You</h1>
                {isForYou && (
                  <div className="h-1 bg-primary-base absolute bottom-0 w-full rounded-full"></div>
                )}
              </div>
            </button>

            <button
              onClick={() => {
                setIsForYou?.(false);
              }}
              className="flex justify-center w-full cursor-pointer hover:bg-gray-extraLight duration-150"
            >
              <div className="relative h-14 flex items-center w-fit">
                <h1 className={` ${!isForYou && "font-bold"}`}>Following</h1>
                {!isForYou && (
                  <div className="h-1 bg-primary-base absolute bottom-0 w-full rounded-full"></div>
                )}
              </div>
            </button>
          </div>
        </div>
        )}
        
        <hr />
      </div>
    </div>
  );
};

export default HomeHeader;
