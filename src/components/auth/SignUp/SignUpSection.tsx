import React, { useState } from "react";
import Terms from "./Terms";
import SocialAuthButtons from "../SocialAuthButtons";
import CreateAccountSteps from "./CreateAccountSteps";
import AuthHeader from "../AuthHeader";

interface IProps {
  title: string;
  mode: "login" | "signup";
  isRoute?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpSection = ({ title, mode, isRoute, setOpen }: IProps) => {
  const [showCreateAccSteps, setShowSteps] = useState(false);

  if (showCreateAccSteps) {
    return <CreateAccountSteps isRoute={isRoute} setOpen={setOpen} />;
  }

  return (
    <>
      <AuthHeader isRoute={isRoute} setOpen={setOpen} />
      <div>
        <div className="flex flex-col px-8 pb-12 ml-auto mr-auto max-w-sm">
          <SocialAuthButtons title={title} mode={mode} />

          <div className="my-3">
            <div className="flex flex-row h-2 w-full mx-1 items-center">
              <div className="h-0.5 w-full mx-1 bg-gray-300"></div>
              <span className="mx-1 font-semibold">or</span>
              <div className="h-0.5 w-full mx-1 bg-gray-300"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="h-10 my-3">
              <button
                onClick={() => setShowSteps(true)}
                className="w-full h-full rounded-full bg-black text-white hover:brightness-200 "
              >
                <div className="flex flex-row justify-center items-center">
                  <span className="font-bold">Create account</span>
                </div>
              </button>
            </div>
            <Terms />
            <span className="mt-10 text-base text-gray-500">
              Have an account already?{" "}
              <a
                href="/login"
                className="text-primary-dark hover:underline underline-offset-auto"
              >
                Log in
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpSection;