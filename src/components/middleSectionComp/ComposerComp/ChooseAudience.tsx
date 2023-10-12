import React, { useState, useEffect, useRef, useCallback } from "react";
import { DropDownMenuArrowIcon } from "@icons/Icon";
import AudienceMenu from "./AudienceMenu";
import classNames from "classnames";

interface IProps {
  composerSettings: {
    audience: "everyone" | "specificUsers";
    whoCanReply: "everyone" | "following" | "mentioned";
  };
}

const ChooseAudience: React.FC<IProps> = ({ composerSettings }) => {
  const audienceRef = useRef<HTMLDivElement>(null);
  const audienceButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (
        audienceRef.current &&
        !audienceRef.current.contains(event.target as Node) &&
        (!audienceButtonRef.current ||
          !audienceButtonRef.current.contains(event.target as Node))
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

  const audienceClasses = classNames(
    "border rounded-full inline-flex items-center px-3 py-0.5",
    {
      "text-primary-base hover:bg-primary-extraLight":
        composerSettings.audience === "everyone",
      "text-green-500 hover:bg-green-50":
        composerSettings.audience === "specificUsers",
    }
  );

  return (
    <>
      <div className="relative inline-flex pb-3">
        <button
          ref={audienceButtonRef}
          type="button"
          onClick={() => setShowMenu(!showMenu)}
          className={audienceClasses}
        >
          <span className="text-sm font-medium">
            {composerSettings.audience === "everyone"
              ? "Everyone"
              : "Twitter Circle"}
          </span>
          <span className="ml-1">
            <DropDownMenuArrowIcon />
          </span>
        </button>
        {showMenu && (
          <div
            ref={audienceRef}
            className="absolute w-64 h-fit bg-white border rounded-2xl top-8 z-20 shadow-xl"
          >
            <AudienceMenu
              composerSettings={composerSettings}
              onClose={() => setShowMenu(false)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ChooseAudience;
