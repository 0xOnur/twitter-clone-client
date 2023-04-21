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
      <div className="h-auto backdrop-blur-md bg-white/80">
        <div className="h-full">
          <div className="flex flex-row items-center cursor-pointer z-10 p-3">
            <div className="relative text-2xl w-14 leading-5">
              <button onClick={handleBack}>
                <div className="w-9 h-9 hover:bg-gray-extraLight duration-150 rounded-full flex justify-center items-center">
                  <BackIcon className="w-5 h-5" />
                </div>
              </button>
            </div>
            <span className="text-2xl font-bold">Tweet</span>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default TweetHeader;
