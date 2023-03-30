import React, { useState, useEffect, useRef, useCallback } from "react";
import { DropDownMenuArrowIcon } from "../../../icons/Icon";
import AudienceMenu from "./AudienceMenu";

interface IProps {
  Audience: string;
  setAudience: React.Dispatch<React.SetStateAction<string>>;
}


const ChooseAudience: React.FC<IProps> = ({setAudience, Audience}) => {
  const audienceRef = useRef<HTMLDivElement>(null);
  const audienceButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (
        audienceRef.current &&
        !audienceRef.current.contains(event.target as Node) &&
        (!audienceButtonRef.current ||
          !audienceButtonRef.current.contains(event.target as Node)
        )
      ) {
        setShowMenu(false);
      }
    },
    [audienceRef]
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
          <button
            ref={audienceButtonRef}
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="text-primary-base cursor-pointer hover:bg-primary-extraLight border rounded-full inline-flex items-center px-3"
          >
            <span className="text-sm font-medium">{Audience}</span>
            <span className="">
              <DropDownMenuArrowIcon />
            </span>
          </button>
          {showMenu && (
            <div
              ref={audienceRef}
              className="absolute w-64 h-fit bg-white border rounded-2xl top-8 z-20 shadow-xl"
            >
              <AudienceMenu setAudience={setAudience} Audience={Audience} onClose={()=> setShowMenu(false)} />
            </div>
          )}
        </div>
    </>
  );
};

export default ChooseAudience;
