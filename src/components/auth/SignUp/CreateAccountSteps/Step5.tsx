import React from "react";
import classNames from "classnames";
import { useQuery } from "@tanstack/react-query";
import { usernameIsAvailable } from "api/userApi";
import useToast from "@hooks/useToast";
import { LoadingIcon } from "@icons/Icon";

type User = {
  username: string;
};

interface StepProps {
  onNext: () => void;
  onStepData: (data: {username?: string}) => void;
  user: User;
}
const Step5 = ({ onNext, onStepData, user }: StepProps) => {
  const { showToast } = useToast();

  const handleError = ()=> {
    showToast("Error checking username.", "error");
  }

  const {refetch, isFetching} = useQuery(
    ["usernameIsAvailable", user.username],
    () => usernameIsAvailable(user.username),
    {
      enabled: false,
      onError: handleError,
    }
  );

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onStepData({username: e.target.value});
  };

  const handleNext = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const {data: usernameIsAvailable} = await refetch();
      if (usernameIsAvailable) {
        onNext();
      }else {
        showToast("Username is already taken.", "error");
      }
    } catch (error) {
      handleError();
    }
  }

  if (isFetching) {
    return(
      <div className="flex h-full items-center justify-center">
        <LoadingIcon />
      </div>
    )
  }


  const usernameInputClasses = classNames("relative border-2 border-gray-300 focus-within:border-[color:var(--color-primary)] rounded-lg", {
    "border-blue-base": user.username.length>0,
  });

  const nextButtonClasses = classNames("w-full h-full rounded-full", {
    "bg-black text-white hover:brightness-200": user.username,
    "bg-gray-300 hover:bg-gray-200 cursor-not-allowed": !user.username,
  });

  return (
    <form onSubmit={handleNext} className="h-full">
      <div className="flex flex-col justify-between px-20 h-full">
        <div>
          <div className="flex flex-col py-5">
            <h2 className="relative text-3xl font-bold ">
              What should we call you?
            </h2>
            <div className="mt-2">
              <p className="text-lg text-gray-500">
                Your @username is unique. You can always change it later.
              </p>
            </div>
          </div>
          <div className="py-3">
            <div className={usernameInputClasses}>
              <input
                type="text"
                placeholder=" "
                required={true}
                maxLength={30}
                className="block pt-3 mt-4 pb-2 px-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
                value={user.username}
                onChange={handleUsernameChange}
              />
              <label className="absolute origin-0 top-0 p-4 -z-10 text-lg text-[color:var(--color-base-secondary)] duration-300">
                Username
              </label>
              <label htmlFor="Choice1" className="second-label text-lg p-4">
                {user.username.length} / 30
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="h-14 my-3">
            <button type="submit" className={nextButtonClasses}>
              <div className="flex flex-row justify-center items-center">
                <span className="font-bold">Next</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Step5;
