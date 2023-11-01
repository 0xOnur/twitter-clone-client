import React from "react";

const Header = () => {
  return (
    <div className="flex flex-col">
      <div className="flex mt-8 mb-3">
        <div className="flex justify-center w-full leading-7 text-[23px] font-extrabold">
          Customize your view
        </div>
      </div>
      <div className="text-center text-[color:var(--color-base-secondary)] leading-5 text-[0.938rem] px-8 mb-5">
        These settings affect all the X accounts on this browser.
      </div>
    </div>
  );
};

export default Header;
