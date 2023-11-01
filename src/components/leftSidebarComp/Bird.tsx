import { TwitterIcon } from "@icons/Icon";
import React from "react";

const Bird = () => {
  return (
    <div className="flex flex-col max-w-full py-0.5">
      <div className="flex flex-col min-w-32px cursor-pointer self-stretch justify-center items-center">
        <a
          href="/"
          className="flex justify-center items-center min-w-52px min-h-52px hover:bg-[color:var(--background-third)] duration-200 rounded-full"
        >
          <TwitterIcon
            className={"h-8 [color:var(--color-primary)] max-w-full"}
          />
        </a>
      </div>
    </div>
  );
};

export default Bird;
