import React from "react";
import {  EveryoneIcon, TwiiterCircleIcon, SelectedIcon } from "../../../icons/Icon";
import {ComposerSettings} from "@customTypes/ComposerTypes"

interface IProps {
  ComposerSettings: ComposerSettings;
  onClose: () => void;
}

export const AudienceMenu: React.FC<IProps> = ({ComposerSettings, onClose}) => {
  
  const handleItemClick = (value: string) => {
    ComposerSettings.Audience = value;
    onClose();
  }

  return (
    <div className="flex flex-col py-3">
      <div className="px-3 py-1">
        <span className="text-lg font-bold">Choose Audience</span>
      </div>

      <div className="hover:bg-gray-rightbar cursor-pointer" onClick={() => (handleItemClick("Everyone"))}>
        <div className="flex items-center justify-between w-full px-4 py-3">
          <div className="inline-flex items-center">
            {}
            <div className="flex justify-center items-center bg-primary-base w-10 h-10 mr-3 rounded-full">
                <EveryoneIcon className={"h-5 w-5 text-white"} />
            </div>
            <span className="font-bold">Everyone</span>
          </div>
          {ComposerSettings.Audience === "Everyone" && (
            <div className="">
              <span className="text-primary-base"> <SelectedIcon className={"w-5 h-5"} /> </span>
            </div>
          )}
            
        </div>
      </div>

      <div className="hover:bg-gray-rightbar cursor-pointer" onClick={()=> (handleItemClick("People you follow"))}>
        <div className="flex items-center justify-between w-full px-4 py-3">
          <div className="inline-flex items-center">
            <div className="flex justify-center items-center bg-primary-base w-10 h-10 mr-3 rounded-full">
                <TwiiterCircleIcon className={"h-5 w-5 text-white"} />
            </div>
            <span className="font-bold">People you follow</span>
          </div>
          {ComposerSettings.Audience === "People you follow" && (
            <div className="">
              <span className="text-primary-base"> <SelectedIcon className={"w-5 h-5"} /> </span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default AudienceMenu;
