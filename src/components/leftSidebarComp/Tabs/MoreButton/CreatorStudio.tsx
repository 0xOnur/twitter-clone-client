import { AnalyticsIcon, DropDownMenuArrowIcon } from "@icons/Icon";
import classNames from "classnames";
import React, { useState } from "react";

const CreatorStudio = () => {
  const [creatorIsOpen, setCreatorOpen] = useState(false);

  const dropDownIconClassNames = classNames({
    "rotate-180 text-[color:var(--color-primary)]": creatorIsOpen,
  });

  return (
    <div>
      <button
        onClick={() => {
          setCreatorOpen(!creatorIsOpen);
        }}
        className="flex hover:bg-[color:var(--background-third)] w-full p-4 justify-between"
      >
        <span>Creator Studio</span>
        <span className={dropDownIconClassNames}>
          <DropDownMenuArrowIcon />
        </span>
      </button>
      {creatorIsOpen && (
        <button className="flex hover:bg-[color:var(--background-third)] w-full p-3 leading-4 cursor-not-allowed">
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
