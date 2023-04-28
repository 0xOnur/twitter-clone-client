import React, { useState, useRef, useEffect } from "react";
import { TreeDotIcon } from "@icons/Icon";

const UserBox: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClose = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, []);

  const name = "Onur Abadqwdwqdwqdwqdwqdwqdwqqdwt";
  const username = "@0xOnur";

  return (
    <>
      <div className="flex flex-col">
        {menuOpen && (
          <div className="absolute" ref={dropdownRef}>
            <div className="absolute text-left text-md font-bold z-10 w-72 mb-2 bottom-full h-32 py-3 rounded-3xl bg-white border border-gray-100  shadow-lg">
              <hr />
              <div className="pb-3">
                <a href="/" className="py-6">
                  <div className="hover:bg-gray-dropdown  px-4 py-3">
                    Add an existing account
                  </div>
                </a>
                <a href="/" className="py-6">
                  <div className="hover:bg-gray-dropdown  px-4 py-3">
                    Log out @0xOnur
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleClick}
          className="flex flex-col lg:items-start sm:items-center cursor-pointer grow-1 w-full my-2 group relative"
        >
          <div className="flex flex-row justify-center items-center  p-3 group-hover:bg-gray-extraLight duration-200 rounded-full">
            <img
              src="https://avatars.githubusercontent.com/u/62797963?v=4"
              alt="Profile"
              className="min-w-fit h-11 w-11 rounded-full"
            />
            <div className="pl-2 hidden  lg:inline-block">
              <span className="flex font-bold text-sm">
                {name.length > 10 ? name.slice(0, 15) + "..." : name}
              </span>
              <span className="flex text-sm text-gray-dark">{username}</span>
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

export default React.memo(UserBox);
