import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { VerifiedIcon } from "@icons/Icon";
import classNames from "classnames";

interface StepProps {
  onNext: () => void;
  onStepData: (step: number, data: any) => void;
  prevData: {
    username: string;
  };
}
const Step5 = ({ onNext, onStepData, prevData }: StepProps) => {
  const [username, setUsername] = useState<string>(prevData?.username || "");

  const [usernameIsAvailable, setAveliable] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onStepData(5, {username: username});
    onNext();
  };

  const usernameInputClasses = classNames("relative border-2 rounded-lg", {
    "border-gray-300 focus-within:border-primary-base": usernameIsAvailable,
    "border-red-600": !usernameIsAvailable,
  });

  return (
    <form onSubmit={handleSubmit} className="h-full">
      <div className="flex flex-col justify-between px-20 h-full">
        <div>
          <div className="flex flex-col py-5">
            <Dialog.Title as="h2" className="relative text-3xl font-bold ">
              What should we call you?
            </Dialog.Title>
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
                value={username}
                onChange={(e) => setUsername(e.target.value.toLocaleLowerCase())}
              />
              <label className="absolute top-0 text-lg text-gray-500 p-4 -z-10 duration-300 origin-0">
                Username
              </label>
              <label htmlFor="Choice1" className="second-label text-lg p-4">
                {username.length} / 30
              </label>
              {usernameIsAvailable && (
                <div className="absolute  top-6 right-3">
                  <VerifiedIcon className={" w-6 h-6 text-primary-base"} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="h-14 my-3">
            <button
              type="submit"
              className="w-full h-full rounded-full bg-black text-white hover:brightness-200"
            >
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
