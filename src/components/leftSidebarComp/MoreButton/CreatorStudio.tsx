import { AnalyticsIcon, DropDownMenuArrowIcon } from "@icons/Icon";
import React, { useState } from "react";

const CreatorStudio = () => {
  const [creatorIsOpen, setCreatorOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => {setCreatorOpen(!creatorIsOpen)}}
        className="flex hover:bg-gray-dropdown w-full p-4 justify-between"
      >
        <span>Creator Studio</span>
        <span
          className={`${creatorIsOpen ? "rotate-180 text-primary-base " : ""}`}
        >
          <DropDownMenuArrowIcon />
        </span>
      </button>
      {creatorIsOpen && (
        <button className="flex hover:bg-gray-dropdown w-full p-3 leading-4 cursor-not-allowed">
          <span>
            <AnalyticsIcon className={"w-4 h-4"} />
          </span>
          <span className="font-normal pl-3">Analytics</span>
        </button>
      )}
    </div>
  );
};

export default CreatorStudio;
