import React, {useState} from "react";
import { VerifiedIcon } from "@icons/Icon";
import classNames from "classnames";
import { useMutation } from "@tanstack/react-query";
import { debounce } from "lodash";
import { checkUsername } from "api/userApi";

type User = {
  username: string;
  usernameAvailable: boolean;
};

interface StepProps {
  onNext: () => void;
  onStepData: (data: {
    username?: string;
    usernameAvailable?: boolean;
  }) => void;
  user: User;
}
const Step5 = ({ onNext, onStepData, user }: StepProps) => {
  const [lastInputChangeTimestamp, setLastInputChangeTimestamp] = useState(0);
  const [mutationPending, setMutationPending] = useState(false);

  const usernameIsTakenMutation = useMutation(checkUsername, {
    onSuccess: (data) => {
      onStepData({ usernameAvailable: data });
      setMutationPending(false);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.trim();
    onStepData({ username: inputValue });
    if (inputValue.length > 0) {
      setMutationPending(true);
      setLastInputChangeTimestamp(Date.now());
      debouncedUsernameIsTakenMutation(inputValue);
    } else {
      onStepData({ username: "", usernameAvailable: false });
    }
  };

  const debouncedUsernameIsTakenMutation = debounce((inputValue: string) => {
    setMutationPending(false);
    usernameIsTakenMutation.mutate(inputValue);
  }, 300);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const timeSinceLastInputChange = Date.now() - lastInputChangeTimestamp;
    
    if (
      user.usernameAvailable &&
      !usernameIsTakenMutation.isLoading &&
      !mutationPending &&
      timeSinceLastInputChange >= 300
    ) {
      onNext();
    }
  };

  const usernameInputClasses = classNames("relative border-2 border-gray-300 rounded-lg", {
    "border-primary-base": user.usernameAvailable && user.username.length>0,
    "border-red-600": !user.usernameAvailable && user.username.length > 0,
  });

  const nextButtonClasses = classNames("w-full h-full rounded-full", {
    "bg-black text-white hover:brightness-200": user.usernameAvailable,
    "bg-gray-300 hover:bg-gray-200 cursor-not-allowed": !user.usernameAvailable,
  });

  return (
    <form onSubmit={handleSubmit} className="h-full">
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
              <label className="absolute top-0 text-lg text-gray-500 p-4 -z-10 duration-300 origin-0">
                Username
              </label>
              <label htmlFor="Choice1" className="second-label text-lg p-4">
                {user.username.length} / 30
              </label>
              {user.usernameAvailable && (
                <div className="absolute  top-6 right-3">
                  <VerifiedIcon className={" w-6 h-6 text-primary-base"} />
                </div>
              )}
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
