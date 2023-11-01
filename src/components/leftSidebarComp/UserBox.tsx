import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/config/store";
import { TreeDotIcon, VerifiedIcon } from "@icons/Icon";
import { usePopper } from "react-popper";

const UserBox = () => {
  const reduxUser = useSelector((state: RootState) => state.user.user);
  const [menuOpen, setMenuOpen] = useState(false);

  let [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>();
  let [popperElement, setPopperElement] = useState<HTMLDivElement | null>();

  let { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top-start",
  });

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (popperElement && !popperElement.contains(e.target as Node) && !referenceElement?.contains(e.target as Node)) {
        setMenuOpen(false);
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


  return (
    <div className="flex flex-col w-full">
     
      <button
        onClick={() => { setMenuOpen(!menuOpen)}}
        ref={setReferenceElement}
        type="button"
        className="flex flex-col lg:items-start sm:items-center cursor-pointer grow-1 w-full my-2 group relative"
      >
        <div className="flex flex-row justify-center items-center w-full p-3 group-hover:bg-[color:var(--background-third)] duration-200 rounded-full">
          <div className="min-w-max">
            <img
              className="w-11 h-11 rounded-full object-cover"
              src={reduxUser?.avatar}
              alt="avatar"
            />
          </div>
          <div className="min-w-0 px-2 hidden lg:inline-block">
            <div className="flex flex-row items-center gap-1">
              <span className="truncate font-bold ">
                {reduxUser?.displayName}
              </span>
              <span>
                {reduxUser?.isVerified && (
                  <VerifiedIcon className="w-5 h-5 mt-1 text-[color:var(--color-primary)]" />
                )}
              </span>
            </div>
            <div className="flex">
              <span className=" truncate text-[color:var(--color-base-secondary)]">@{reduxUser?.username}</span>
            </div>
          </div>
          <div className="ml-auto hidden lg:inline-block">
            <TreeDotIcon className={"w-5 h-5"} />
          </div>
        </div>
      </button>

      {menuOpen && (
        <div 
          style={styles.popper}
          {...attributes.popper}
          className="z-50" 
          ref={setPopperElement}
        >
          <div className="z-10 w-72 mb-2 bottom-full bg-[color:var(--background-primary)] shadow-box rounded-2xl overflow-hidden">
            <div className="font-bold">
              <a href="/" className="py-6">
                <div className="px-4 py-3 cursor-not-allowed hover:bg-[color:var(--background-third)]">
                  Add an existing account
                </div>
              </a>
              <a href="/logout" className="py-6">
                <div className="px-4 py-3 truncate hover:bg-[color:var(--background-third)]">
                  Log out @{reduxUser?.username}
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default UserBox;
