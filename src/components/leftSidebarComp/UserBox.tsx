import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/config/store";
import { TreeDotIcon, VerifiedIcon } from "@icons/Icon";


const UserBox = () => {
  const reduxUser = useSelector((state: RootState) => state.user.user);

  const displayName = reduxUser.displayName || "";
  const username = reduxUser.username || "";


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
          !menuButtonRef.current.contains(event.target as Node)
        )
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
    <>
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
                    Log out @{username}
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
            <img
              src={reduxUser.avatar!}
              alt="Profile"
              className="min-w-fit h-11 w-11 object-cover rounded-full"
            />
            <div className="pl-2 hidden  lg:inline-block">
              <span className="flex flex-row gap-1 items-center font-bold">
                {displayName.length > 20 ? displayName.slice(0, 15) + "..." : displayName}
                {reduxUser.isVerified && (
                  <VerifiedIcon className="w-5 h-5 text-primary-base" />
                )}
              </span>
              <span className="flex  text-gray-dark">@{username}</span>
            </div>
            <div className="ml-auto hidden lg:inline-block">
              <TreeDotIcon className={"w-4 h-4"} />
            </div>
          </div>
        </button>
      </div>
    </>
  );
};

export default UserBox;
