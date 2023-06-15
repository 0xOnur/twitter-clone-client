import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/config/store";
import { TreeDotIcon, VerifiedIcon } from "@icons/Icon";

const UserBox = () => {
  const reduxUser = useSelector((state: RootState) => state.user.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        (!menuButtonRef.current ||
          !menuButtonRef.current.contains(event.target as Node))
      ) {
        setMenuOpen(false);
      }
    },
    [menuRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);

  return (
    <div className="flex flex-col w-full">
      {menuOpen && (
        <div className="absolute" ref={menuRef}>
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

      <button
        onClick={handleClick}
        ref={menuButtonRef}
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
    </div>
  );
};

export default UserBox;
