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
        <div className="flex flex-row justify-center items-center w-full p-3 group-hover:bg-gray-extraLight duration-200 rounded-full">
          <div className="min-w-max">
            <img
              className="w-11 h-11 rounded-full object-cover"
              src={reduxUser.avatar}
              alt="avatar"
            />
          </div>
          <div className="min-w-0 px-2 hidden lg:inline-block">
            <div className="flex flex-row items-center gap-1">
              <span className="truncate font-bold ">
                {reduxUser.displayName}
              </span>
              <span>
                {reduxUser.isVerified && (
                  <VerifiedIcon className="w-5 h-5 mt-1 text-primary-base" />
                )}
              </span>
            </div>
            <span className="flex text-gray-dark">@{reduxUser.username}</span>
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
          <div className="absolute text-left text-md font-bold z-10 w-72 mb-2 bottom-full h-32 py-3 rounded-3xl bg-white border border-gray-100  shadow-lg">
            <hr />
            <div className="pb-3">
              <a href="/" className="py-6">
                <div className="hover:bg-gray-dropdown px-4 py-3 cursor-not-allowed">
                  Add an existing account
                </div>
              </a>
              <a href="/logout" className="py-6">
                <div className="hover:bg-gray-dropdown  px-4 py-3">
                  Log out @{reduxUser.username}
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
