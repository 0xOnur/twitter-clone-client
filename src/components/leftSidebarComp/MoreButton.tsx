import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  MoreIcon,
  ListsIcon,
  TopicsIcon,
  TwiiterCircleIcon,
  DropDownMenuArrowIcon,
  AnalyticsIcon,
  ProfessionalHomeIcon,
  TwitterAdsIcon,
  MonetizetionIcon,
  SettingsIcon,
  HelpCenterIcon,
  DisplayIcon,
  KeyboardShorcutsIcons,
} from "@icons/Icon";

const MoreButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [creatorIsOpen, setCreatorOpen] = useState(false);
  const [profToolIsOpen, setProfToolOpen] = useState(false);
  const [settingsIsOpen, setSettingsOpen] = useState(false);

  const openMore = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const openCreatorMenu = useCallback(() => {
    setCreatorOpen((prev) => !prev);
  }, []);

  const openProfToolMenu = useCallback(() => {
    setProfToolOpen((prev) => !prev);
  }, []);

  const openSettingsMenu = useCallback(() => {
    setSettingsOpen((prev) => !prev);
  }, []);

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
        setCreatorOpen(false);
        setProfToolOpen(false);
        setSettingsOpen(false);
      }
    },
    [dropdownRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);

  return (
    <>
      {/* <div onClick={openMore} className="w-full group"> */}
        <button onClick={openMore} className="flex flex-col lg:items-start items-center cursor-pointer grow-1 w-full py-1 group">
          <div className="flex group-hover:bg-gray-lightest rounded-full pl-3 pr-3 py-3">
            <div>
              <MoreIcon />
            </div>
            <span className="ml-5 mr-4 text-xl hidden lg:inline-block">More</span>
          </div>
        </button>
      {/* </div> */}

      {menuOpen && (
        <div className=" z-50" ref={dropdownRef}>
          <div className="absolute overflow-y-auto text-md font-bold w-72 top-36 rounded-3xl bg-white border border-gray-100 shadow-xl">
            <div>
              <button className="w-full">
                <div className="flex hover:bg-gray-dropdown rounded-t-2xl px-4 pb-3 pt-3">
                  <TopicsIcon />
                  <span className="pl-6">Topics</span>
                </div>
              </button>
              <button className="w-full">
                <div className="flex hover:bg-gray-dropdown  px-4 py-3">
                  <ListsIcon className="w-7 h-7" />
                  <span className="pl-6">Lists</span>
                </div>
              </button>
              <button className="w-full">
                <div className="flex hover:bg-gray-dropdown  px-4 py-3">
                  <TwiiterCircleIcon className={"w-7 h-7"} />
                  <span className="pl-6">Twitter Circle</span>
                </div>
              </button>
            </div>
            <div className="px-3 my-0.5">
              <hr />
            </div>
            <div>
              <button
                onClick={openCreatorMenu}
                className="flex hover:bg-gray-dropdown w-full p-4 justify-between"
              >
                <span className="">Creator Studio</span>
                <span
                  className={`${
                    creatorIsOpen ? "rotate-180 text-primary-base " : ""
                  }`}
                >
                  <DropDownMenuArrowIcon />
                </span>
              </button>
              {creatorIsOpen && (
                <button className="flex hover:bg-gray-dropdown w-full p-3 leading-4">
                  <span className="">
                    <AnalyticsIcon className={"w-4 h-4"} />
                  </span>
                  <span className="font-normal pl-3">Analytics</span>
                </button>
              )}
              <button
                onClick={openProfToolMenu}
                className="flex hover:bg-gray-dropdown w-full p-4 justify-between"
              >
                <span className="">Professional Tools</span>
                <span
                  className={`${
                    profToolIsOpen ? "rotate-180 text-primary-base " : ""
                  }`}
                >
                  <DropDownMenuArrowIcon />
                </span>
              </button>
              {profToolIsOpen && (
                <button className="flex hover:bg-gray-dropdown w-full p-3 leading-4">
                  <span className="">
                    <ProfessionalHomeIcon />
                  </span>
                  <span className="font-normal pl-3">Professional Home</span>
                </button>
              )}
              {profToolIsOpen && (
                <button className="flex hover:bg-gray-dropdown w-full p-3 leading-4">
                  <span className="">
                    <TwitterAdsIcon />
                  </span>
                  <span className="font-normal pl-3">Twitter Ads</span>
                </button>
              )}
              {profToolIsOpen && (
                <button className="flex hover:bg-gray-dropdown w-full p-3 leading-4">
                  <span className="">
                    <MonetizetionIcon />
                  </span>
                  <span className="font-normal pl-3">Monetization</span>
                </button>
              )}
              <button
                onClick={openSettingsMenu}
                className={`flex hover:bg-gray-dropdown w-full p-4 justify-between ${
                  settingsIsOpen ? "" : "rounded-b-2xl"
                }`}
              >
                <span className={``}>Settings and Support</span>
                <span
                  className={`${
                    settingsIsOpen ? "rotate-180 text-primary-base " : ""
                  }`}
                >
                  <DropDownMenuArrowIcon />
                </span>
              </button>
              {settingsIsOpen && (
                <button className="flex hover:bg-gray-dropdown w-full p-3 leading-4">
                  <span className="">
                    <SettingsIcon />
                  </span>
                  <span className="font-normal pl-3">Settings and privacy</span>
                </button>
              )}
              {settingsIsOpen && (
                <button className="flex hover:bg-gray-dropdown w-full p-3 leading-4">
                  <span className="">
                    <HelpCenterIcon />
                  </span>
                  <span className="font-normal pl-3">Help Center</span>
                </button>
              )}
              {settingsIsOpen && (
                <button className="flex hover:bg-gray-dropdown w-full p-3 leading-4">
                  <span className="">
                    <DisplayIcon />
                  </span>
                  <span className="font-normal pl-3">Display</span>
                </button>
              )}
              {settingsIsOpen && (
                <button className="flex hover:bg-gray-dropdown w-full rounded-b-2xl p-3 leading-4">
                  <span className="">
                    <KeyboardShorcutsIcons />
                  </span>
                  <span className="font-normal pl-3">Keyboard shorcuts</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MoreButton;
