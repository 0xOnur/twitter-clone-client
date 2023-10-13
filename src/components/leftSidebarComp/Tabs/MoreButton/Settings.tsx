import {
  DisplayIcon,
  DropDownMenuArrowIcon,
  HelpCenterIcon,
  KeyboardShorcutsIcons,
  SettingsIcon,
} from "@icons/Icon";
import classNames from "classnames";
import React, { useState } from "react";

const Settings = () => {
  const [settingsIsOpen, setSettingsOpen] = useState(false);

  const settingsClassName = classNames(
    "flex hover:bg-gray-dropdown w-full p-4 justify-between",
    {
      "rounded-b-2xl": !settingsIsOpen,
    }
  );

  const settingsIconClassName = classNames({
    "rotate-180 text-primary-base ": settingsIsOpen,
  });

  return (
    <div>
      <button
        className={settingsClassName}
        onClick={() => {
          setSettingsOpen(!settingsIsOpen);
        }}
      >
        <span>Settings and Support</span>
        <span className={settingsIconClassName}>
          <DropDownMenuArrowIcon />
        </span>
      </button>
      {settingsIsOpen && (
        <button className="flex hover:bg-gray-dropdown w-full p-3 leading-4 cursor-not-allowed">
          <span>
            <SettingsIcon className="w-4 h-4" />
          </span>
          <span className="font-normal pl-3">Settings and privacy</span>
        </button>
      )}
      {settingsIsOpen && (
        <button className="flex hover:bg-gray-dropdown w-full p-3 leading-4 cursor-not-allowed">
          <span>
            <HelpCenterIcon />
          </span>
          <span className="font-normal pl-3">Help Center</span>
        </button>
      )}
      {settingsIsOpen && (
        <button className="flex hover:bg-gray-dropdown w-full p-3 leading-4">
          <span>
            <DisplayIcon />
          </span>
          <span className="font-normal pl-3">Display</span>
        </button>
      )}
      {settingsIsOpen && (
        <button className="flex hover:bg-gray-dropdown w-full rounded-b-2xl p-3 leading-4 ">
          <span>
            <KeyboardShorcutsIcons />
          </span>
          <span className="font-normal pl-3">Keyboard shorcuts</span>
        </button>
      )}
    </div>
  );
};

export default Settings;
