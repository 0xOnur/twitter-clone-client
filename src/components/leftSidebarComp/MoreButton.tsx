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
} from "../../icons/Icon";

const MoreButton = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [creatorSisOn, setCreatorS] = useState(false);
  const [profToolisOn, setProfTool] = useState(false);
  const [settingsisOn, setSettings] = useState(false);

  const openMore = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  const openCreatorMenu = useCallback(() => {
    setCreatorS((prev) => !prev);
  }, []);

  const openProfToolMenu = useCallback(() => {
    setProfTool((prev) => !prev);
  }, []);

  const openSettingsMenu = useCallback(() => {
    setSettings((prev) => !prev);
  }, []);

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
        setCreatorS(false);
        setProfTool(false);
        setSettings(false);
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
      {menuOpen && (
        <div className="absolute z-40" ref={dropdownRef}>
          <div className="absolute overflow-y-auto max-h-screen text-md font-bold z-10 w-72 -top-72 rounded-3xl bg-white border border-gray-100  shadow-xl ">
            <div>
              <a href="/lists" className="">
                <div className="flex hover:bg-gray-dropdown rounded-t-2xl px-4 pb-3 pt-3">
                  <TopicsIcon />
                  <span className="pl-6">Topics</span>
                </div>
              </a>
              <a href="/lists" className="">
                <div className="flex hover:bg-gray-dropdown  px-4 py-3">
                  <ListsIcon />
                  <span className="pl-6">Lists</span>
                </div>
              </a>
              <a href="/lists" className="">
                <div className="flex hover:bg-gray-dropdown  px-4 py-3">
                  <TwiiterCircleIcon className={"w-7 h-7"} />
                  <span className="pl-6">Twitter Circle</span>
                </div>
              </a>
            </div>
            <div className="px-3 my-0.5">
              <hr />
            </div>
            <div>
              <button onClick={openCreatorMenu} className="flex hover:bg-gray-dropdown w-full p-4 justify-between">
                  <span className="">Creator Studio</span>
                  <span className={`${creatorSisOn ? "rotate-180 text-primary-base " : ""}`}><DropDownMenuArrowIcon /></span>
              </button>
                {creatorSisOn && (
                  <button className="flex hover:bg-gray-dropdown w-full p-3 leading-4">
                    <span className=""><AnalyticsIcon className={"w-4 h-4"} /></span>
                    <span className="font-normal pl-3">Analytics</span>
                </button>
                )}
              <button onClick={openProfToolMenu} className="flex hover:bg-gray-dropdown w-full p-4 justify-between">
                  <span className="">Professional Tools</span>
                  <span className={`${profToolisOn ? "rotate-180 text-primary-base " : ""}`}><DropDownMenuArrowIcon /></span>
              </button>
                {profToolisOn && (
                  <button className="flex hover:bg-gray-dropdown w-full p-3 leading-4">
                    <span className=""><ProfessionalHomeIcon /></span>
                    <span className="font-normal pl-3">Professional Home</span>
                </button>
                )}
                {profToolisOn && (
                  <button className="flex hover:bg-gray-dropdown w-full p-3 leading-4">
                    <span className=""><TwitterAdsIcon /></span>
                    <span className="font-normal pl-3">Twitter Ads</span>
                </button>
                )}
                {profToolisOn && (
                  <button className="flex hover:bg-gray-dropdown w-full p-3 leading-4">
                    <span className=""><MonetizetionIcon /></span>
                    <span className="font-normal pl-3">Monetization</span>
                </button>
                )}
              <button onClick={openSettingsMenu} className={`flex hover:bg-gray-dropdown w-full p-4 justify-between ${settingsisOn ? "" : "rounded-b-2xl"}` }>
                  <span className={``}>Settings and Support</span>
                  <span className={`${settingsisOn ? "rotate-180 text-primary-base " : ""}`}><DropDownMenuArrowIcon /></span>
              </button>
                {settingsisOn && (
                  <button className="flex hover:bg-gray-dropdown w-full p-3 leading-4">
                    <span className=""><SettingsIcon /></span>
                    <span className="font-normal pl-3">Settings and privacy</span>
                  </button>
                )}
                {settingsisOn && (
                  <button className="flex hover:bg-gray-dropdown w-full p-3 leading-4">
                    <span className=""><HelpCenterIcon /></span>
                    <span className="font-normal pl-3">Help Center</span>
                  </button>
                )}
                {settingsisOn && (
                  <button className="flex hover:bg-gray-dropdown w-full p-3 leading-4">
                    <span className=""><DisplayIcon /></span>
                    <span className="font-normal pl-3">Display</span>
                  </button>
                )}
                {settingsisOn && (
                  <button className="flex hover:bg-gray-dropdown w-full rounded-b-2xl p-3 leading-4">
                    <span className=""><KeyboardShorcutsIcons /></span>
                    <span className="font-normal pl-3">Keyboard shorcuts</span>
                  </button>
                )}
            </div>
          </div>
        </div>
      )}
      <div onClick={openMore} className="group cursor-pointer">
        <button className=" block text-xl mb-2">
          <div className="inline-block">
            <div className="flex  group-hover:bg-gray-lightest rounded-full pl-3 pr-3 py-3">
              <div className="">
                <MoreIcon />
              </div>
              <span className="ml-4 hidden lg:inline-block">More</span>
            </div>
          </div>
        </button>
      </div>
    </>
  )
}

export default React.memo(MoreButton);