import {
  DropDownMenuArrowIcon,
  MonetizetionIcon,
  ProfessionalHomeIcon,
  TwitterAdsIcon,
} from "@icons/Icon";
import React, { useState } from "react";

const ProfTools = () => {
  const [profToolIsOpen, setProfToolOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setProfToolOpen(!profToolIsOpen);
        }}
        className="flex hover:bg-gray-dropdown w-full p-4 justify-between"
      >
        <span>Professional Tools</span>
        <span
          className={`${profToolIsOpen ? "rotate-180 text-primary-base " : ""}`}
        >
          <DropDownMenuArrowIcon />
        </span>
      </button>

      {profToolIsOpen && (
        <button className="flex hover:bg-gray-dropdown w-full p-3 leading-4 cursor-not-allowed">
          <span>
            <ProfessionalHomeIcon />
          </span>
          <span className="font-normal pl-3">Professional Home</span>
        </button>
      )}

      {profToolIsOpen && (
        <button className="flex hover:bg-gray-dropdown w-full p-3 leading-4 cursor-not-allowed">
          <span>
            <TwitterAdsIcon />
          </span>
          <span className="font-normal pl-3">Twitter Ads</span>
        </button>
      )}
      {profToolIsOpen && (
        <button className="flex hover:bg-gray-dropdown w-full p-3 leading-4 cursor-not-allowed">
          <span>
            <MonetizetionIcon />
          </span>
          <span className="font-normal pl-3">Monetization</span>
        </button>
      )}
    </div>
  );
};

export default ProfTools;
