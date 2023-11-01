import {
  DropDownMenuArrowIcon,
  TwitterAdsIcon,
} from "@icons/Icon";
import classNames from "classnames";
import React, { useState } from "react";

const ProfTools = () => {
  const [profToolIsOpen, setProfToolOpen] = useState(false);

  const dropDownIconClassNames = classNames({
    "rotate-180 text-[color:var(--color-primary)]": profToolIsOpen,
  });

  return (
    <div>
      <button
        onClick={() => {
          setProfToolOpen(!profToolIsOpen);
        }}
        className="flex hover:bg-[color:var(--background-third)] w-full p-4 justify-between"
      >
        <span>Professional Tools</span>
        <span
          className={dropDownIconClassNames}
        >
          <DropDownMenuArrowIcon />
        </span>
      </button>

      {profToolIsOpen && (
        <button className="flex hover:bg-[color:var(--background-third)] w-full p-3 leading-4 cursor-not-allowed">
          <span>
            <TwitterAdsIcon />
          </span>
          <span className="font-normal pl-3">Twitter Ads</span>
        </button>
      )}
      
    </div>
  );
};

export default ProfTools;
