import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { usernameExist } from "api/userApi";
import SocialAuthButtons from "@components/auth/SocialAuthButtons";
import PasswordScreen from "./PasswordScreen";
import AuthHeader from "@components/auth/Modal/AuthHeader";
import useToast from "@hooks/useToast";
import { LoadingIcon } from "@icons/Icon";

interface IProps {
  title: string;
  mode: "login" | "signup";
  isRoute?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignInSection = ({ title, mode, isRoute, setOpen }: IProps) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordSection, setPasswordMode] = useState(false);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleError = () => {
    showToast("Error checking username.", "error");
  };

  const { refetch, isFetching } = useQuery(
    ["usernameExist", username],
    () => usernameExist(username),
    {
      enabled: false,
      onError: handleError,
    }
  );

  const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data: userIsExistResult } = await refetch();
      if (userIsExistResult) {
        setPasswordMode(true);
      } else {
        showToast("User not found.", "error");
      }
    } catch (error) {
      handleError();
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingIcon />
      </div>
    );
  }

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
            <div className="flex flex-row h-2 w-full items-center">
              <div className="h-0.5 w-full bg-gray-300"></div>
              <span className="mx-2 font-semibold">or</span>
              <div className="h-0.5 w-full bg-gray-300"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <form onSubmit={handleNext}>
              <div className="py-3">
                <div className="relative border-2 border-gray-300 rounded-sm focus-within:border-[color:var(--color-primary)]">
                  <input
                    type="text"
                    required={true}
                    placeholder=" "
                    maxLength={30}
                    className="block pt-3 mt-4 pb-2 px-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                  <label className="absolute origin-0 top-0 p-4 -z-10 text-lg text-[color:var(--color-base-secondary)] duration-300">
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
                className="text-[color:var(--color-primary)] hover:underline"
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
