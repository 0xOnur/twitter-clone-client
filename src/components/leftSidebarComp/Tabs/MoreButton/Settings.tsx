import AppearanceDialog from "@components/middleSectionComp/DialogModals/Appearance";
import {
  DisplayIcon,
  DropDownMenuArrowIcon,
  HelpCenterIcon,
  KeyboardShorcutsIcons,
  SettingsIcon,
} from "@icons/Icon";
import classNames from "classnames";
import { useModal } from "contexts/ModalContext";
import React, { useState } from "react";

const Settings = () => {
  const [settingsIsOpen, setSettingsOpen] = useState(false);

  const {openModal, closeModal} = useModal()

  const handleDisplay = () => {
    openModal(<AppearanceDialog closeModal={closeModal} />)
  }

  const settingsClassName = classNames(
    "flex hover:bg-[color:var(--background-third)] w-full p-4 justify-between",
    {
      "rounded-b-2xl": !settingsIsOpen,
    }
  );

  const dropDownIconClassNames = classNames({
    "rotate-180 text-[color:var(--color-primary)]": settingsIsOpen,
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
        <span className={dropDownIconClassNames}>
          <DropDownMenuArrowIcon />
        </span>
      </button>
      {settingsIsOpen && (
        <button className="flex hover:bg-[color:var(--background-third)] w-full p-3 leading-4 cursor-not-allowed">
          <span>
            <SettingsIcon className="w-4 h-4" />
          </span>
          <span className="font-normal pl-3">Settings and privacy</span>
        </button>
      )}
      {settingsIsOpen && (
        <button className="flex hover:bg-[color:var(--background-third)] w-full p-3 leading-4 cursor-not-allowed">
          <span>
            <HelpCenterIcon />
          </span>
          <span className="font-normal pl-3">Help Center</span>
        </button>
      )}
      {settingsIsOpen && (
        <button onClick={handleDisplay} className="flex hover:bg-[color:var(--background-third)] w-full p-3 leading-4">
          <span>
            <DisplayIcon />
          </span>
          <span className="font-normal pl-3">Display</span>
        </button>
      )}
      {settingsIsOpen && (
        <button className="flex hover:bg-[color:var(--background-third)] w-full rounded-b-2xl p-3 leading-4 ">
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
