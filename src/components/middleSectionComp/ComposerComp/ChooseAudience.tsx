import React, { useState, useEffect, useRef, useCallback } from "react";
import { DropDownMenuArrowIcon } from "../../../icons/Icon";
import AudienceMenu from "./AudienceMenu";

interface IProps {
  Audience: string;
  setAudience: React.Dispatch<React.SetStateAction<string>>;
}


const ChooseAudience: React.FC<IProps> = ({setAudience, Audience}) => {
    
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
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

  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
        <div className="relative inline-flex pb-3">
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="text-primary-base cursor-pointer hover:bg-primary-extraLight border rounded-full inline-flex items-center px-3"
          >
            <span className="text-sm font-medium">{Audience}</span>
            <span className="">
              <DropDownMenuArrowIcon />
            </span>
          </div>
          {showMenu && (
            <div
              ref={dropdownRef}
              className="absolute w-64 h-fit bg-white border rounded-2xl top-8 z-20"
            >
              <AudienceMenu setAudience={setAudience} Audience={Audience} onClose={()=> setShowMenu(false)} />
            </div>
          )}
        </div>
    </>
  );
};

export default ChooseAudience;
