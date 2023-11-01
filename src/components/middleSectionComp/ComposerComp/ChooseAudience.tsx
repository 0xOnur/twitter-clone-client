import React, { useState, useEffect, useCallback } from "react";
import { DropDownMenuArrowIcon } from "@icons/Icon";
import AudienceMenu from "./AudienceMenu";
import classNames from "classnames";
import { usePopper } from "react-popper";
import { Portal } from "contexts/Portal";

interface IProps {
  composerSettings: {
    audience: "everyone" | "specificUsers";
    whoCanReply: "everyone" | "following" | "mentioned";
  };
}

const ChooseAudience: React.FC<IProps> = ({ composerSettings }) => {
  const [showMenu, setShowMenu] = useState(false);

  let [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();

  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom",
  });

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (
        popperElement &&
        !popperElement.contains(e.target as Node) &&
        !referenceElement?.contains(e.target as Node)
      ) {
        setShowMenu(false);
      }
    },
    [popperElement, referenceElement]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const audienceClasses = classNames(
    "relative border rounded-full items-center overflow-hidden",
    {
      "border-[color:var(--color-primary)] text-[color:var(--color-primary)]": composerSettings.audience === "everyone",
      "border-green-base text-green-base": composerSettings.audience === "specificUsers",
    }
  );

  const audienceBG = classNames("absolute w-full h-full", {
    "hover:bg-[color:var(--color-primary)] opacity-10": composerSettings.audience === "everyone",
    "hover:bg-green-base opacity-10": composerSettings.audience === "specificUsers",
  });

  return (
    <>
      <div className="relative pb-3">
        <button
          ref={setReferenceElement}
          type="button"
          onClick={() => setShowMenu(!showMenu)}
          className={audienceClasses}
        >
          <div className={audienceBG} />
          <div className="flex px-3 py-0.5">
            <span className="text-sm font-medium">
              {composerSettings.audience === "everyone"
                ? "Everyone"
                : "Twitter Circle"}
            </span>
            <span className="ml-1">
              <DropDownMenuArrowIcon />
            </span>
          </div>
        </button>
        {showMenu && (
          <Portal>
            <div
              className="z-30"
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              <AudienceMenu
                composerSettings={composerSettings}
                onClose={() => setShowMenu(false)}
              />
            </div>
          </Portal>
        )}
      </div>
    </>
  );
};

export default ChooseAudience;
