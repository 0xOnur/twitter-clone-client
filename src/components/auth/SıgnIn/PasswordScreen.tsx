import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { ShowPasswordIcon } from "@icons/Icon";

interface IProps {
  username: string;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const PasswordScreen = ({ username, password, setPassword }: IProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      username: username,
      password: password,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="h-full">
      <div className="flex flex-col justify-between px-20 h-full">
        <div>
          <div className="flex justify-center py-5">
            <Dialog.Title as="h2" className="relative text-3xl font-bold mb-6">
              Enter your password
            </Dialog.Title>
          </div>

          <div className="py-3">
            <div className="relative border  rounded-md cursor-not-allowed bg-gray-400/5 text-gray-400">
              <input
                disabled={true}
                placeholder=" "
                className="block pt-3 mt-4 pb-2 px-2 w-full text-lg appearance-none focus:outline-none bg-transparent cursor-not-allowed"
                value={username}
              />
              <label className="absolute top-0 text-lg text-gray-500 p-4 -z-10 duration-300 origin-0">
                Username
              </label>
            </div>
          </div>
          <div className="py-3">
            <div className="relative border border-gray-500 rounded-md">
              <input
                type={showPassword ? "text" : "password"}
                placeholder=" "
                required={true}
                className="block pt-3 mt-4 pb-2 px-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="absolute top-0 text-lg text-gray-500 p-4 -z-10 duration-300 origin-0">
                Password
              </label>
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="absolute  top-6 right-3 text-white hover:bg-gray-200 rounded-full focus:outline-none"
              >
                <ShowPasswordIcon
                  className={" w-6 h-6"}
                  isShow={showPassword}
                />
              </button>
            </div>
            <div className="px-2">
              <a href="/reset_password" className="text-primary-dark">
                Forgot your password?
              </a>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col">
            <div className="h-14 my-3">
              <button
                type="submit"
                className="w-full h-full rounded-full bg-black text-white hover:brightness-200"
              >
                <div className="flex flex-row justify-center items-center">
                  <span className="font-bold">Log in</span>
                </div>
              </button>
            </div>
            <div className="pb-6">
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
    </form>
  );
};

export default PasswordScreen;
