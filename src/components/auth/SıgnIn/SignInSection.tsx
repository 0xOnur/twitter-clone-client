import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SocialAuthButtons from "../SocialAuthButtons";
import PasswordScreen from "./PasswordScreen";
import AuthHeader from "../AuthHeader";

interface IProps {
  title: string;
  mode: "login" | "signup";
  isRoute?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignInSection = ({ title, mode, isRoute, setOpen }: IProps) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState(String);
  const [password, setPassword] = useState(String);
  const [showPasswordSection, setPasswordMode] = useState(false);

  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordMode(true);
  };

  if (showPasswordSection) {
    return (
      <>
      <AuthHeader isRoute={isRoute} setOpen={setOpen} />
      <PasswordScreen
        username={username}
        password={password}
        setPassword={setPassword}
      />
      </>
    );
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
            <form onSubmit={handleNext}>
              <div className="py-3">
                <div className="relative border-2 border-gray-300 rounded-sm focus-within:border-primary-base">
                  <input
                    type="text"
                    required={true}
                    placeholder=" "
                    maxLength={25}
                    className="block pt-3 mt-4 pb-2 px-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label className="absolute top-0 text-lg text-gray-500 p-4 -z-10 duration-300 origin-0">
                    Username
                  </label>
                </div>
              </div>

              <div className="h-10 my-3">
                <button
                  type="submit"
                  className="w-full h-full rounded-full bg-black text-white hover:brightness-200 duration-200"
                >
                  <div className="flex flex-row justify-center items-center">
                    <span className="font-bold">Next</span>
                  </div>
                </button>
              </div>
            </form>
            <div className="h-10 my-3">
              <button
                className="w-full h-full border rounded-full bg-white text-black hover:bg-gray-200 duration-200"
                onClick={() => navigate("/reset_password")}
              >
                <div className="flex flex-row justify-center items-center">
                  <span className="font-bold">Forgot password?</span>
                </div>
              </button>
            </div>

            <div className="mt-10">
              <span>Don't have an account? </span>
              <a
                href="/signup"
                className="text-primary-dark hover:underline underline-offset-auto"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInSection;
