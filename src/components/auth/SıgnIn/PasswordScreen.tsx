import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "redux/config/store";
import { loginUser } from "api/userApi";
import useToast from "@hooks/useToast";
import { LoadingIcon, ShowPasswordIcon } from "@icons/Icon";

interface IProps {
  username: string;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const PasswordScreen = ({ username, password, setPassword }: IProps) => {
  const dispatch: AppDispatch = useDispatch();
  const redux = useSelector((state: RootState) => state.user)
  const { showToast } = useToast();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ username, password })).then((response) => {
      if (response.meta.requestStatus === "rejected") {
        showToast(response.payload.message, "error")
      }else if(response.meta.requestStatus === "fulfilled") {
        setTimeout(() => {
          showToast("Logged in", "success");
        }, 3000)
      }
    });
  };

  if (redux.isPending) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingIcon />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="h-full">
      <div className="flex flex-col justify-between px-20 h-full">
        <div>
          <div className="flex justify-center py-5">
            <h2 className="relative text-3xl font-bold mb-6">
              Enter your password
            </h2>
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
            <div className="relative border-2 border-gray-300 rounded-lg focus-within:border-primary-base">
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
            {redux.error?.message && (
              <span className="bottom-0 left-0 text-sm text-red-600">
                {redux.error.message}
              </span>
            )}
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
