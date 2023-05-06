import React from "react";
import { GoogleIcon, AppleIcon } from "@icons/Icon";

interface IProps {
    mode: "login" | "signup";
    title: string;
}

const SocialAuthButtons = ({mode, title}: IProps) => {
  return (
    <>
      <div className="flex justify-center py-5">
        <h2 className="relative text-3xl font-bold mb-6">
          {title}
        </h2>
      </div>
      <div className="h-10 my-3">
        <button className="w-full h-full border rounded-full bg-white hover:bg-gray-200 text-black">
          <div className="flex flex-row justify-center items-center">
            <GoogleIcon className={"w-5 h-5 mr-2"} />
            <span className="font-semibold">
              {mode === "login" ? "Sign in with Google" : "Sign up with Google"}
            </span>
          </div>
        </button>
      </div>
      <div className="h-10 my-3">
        <button className="cursor-not-allowed w-full h-full border rounded-full bg-white hover:bg-gray-200 text-black">
          <div className="flex flex-row justify-center items-center">
            <AppleIcon className={"w-5 h-6 mr-2"} />
            <span className="font-bold">
              {mode === "login" ? "Sign in with Apple" : "Sign up with Apple"}
            </span>
          </div>
        </button>
      </div>
    </>
  );
};

export default SocialAuthButtons;
