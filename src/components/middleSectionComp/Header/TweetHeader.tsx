import React from "react";
import { useNavigate } from "react-router-dom";
import { BackIcon } from "@icons/Icon";

const TweetHeader = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="sticky top-0 z-30">
      <div className="h-auto backdrop-blur-md bg-[color:var(--background-primary-alpha)]">
        <div className="h-full">
          <div className="flex flex-row items-center cursor-pointer z-10 p-3">
            <div className="relative text-2xl w-14 leading-5">
              <button onClick={handleBack}>
              <div className=" flex justify-center items-center w-10 h-10 hover:bg-[color:var(--background-third)] duration-150 rounded-full">
                  <BackIcon className="w-5 h-5" />
                </div>
              </button>
            </div>
            <span className="text-2xl font-bold">Tweet</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetHeader;
