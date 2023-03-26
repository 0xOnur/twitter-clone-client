import React from "react";
import {  EveryoneIcon, TwiiterCircleIcon } from "../../icons/Icon";

export const AudienceMenu = () => {
  return (
    <div className="flex flex-col py-3">
      <div className="px-3 py-1">
        <span className="text-lg font-bold">Choose Audience</span>
      </div>
      <div className="hover:bg-gray-rightbar">
        <button className="flex items-center w-full px-4 py-3">
            <div className="flex justify-center items-center bg-primary-base w-10 h-10 mr-3 rounded-full">
                <EveryoneIcon className={"h-5 w-5 text-white"} />
            </div>
            <span className="font-bold ">Everyone</span>
        </button>
      </div>
      <div className="hover:bg-gray-rightbar">
        <button className="flex items-center w-full px-4 py-3">
            <div className="flex justify-center items-center bg-primary-base w-10 h-10 mr-3 rounded-full">
                <TwiiterCircleIcon className={"h-5 w-5 text-white"} />
            </div>
            <span className="font-bold ">Everyone</span>
        </button>
      </div>
    </div>
  );
};

export default AudienceMenu;
