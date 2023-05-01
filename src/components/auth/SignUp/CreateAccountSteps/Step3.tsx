import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { ShowPasswordIcon } from "@icons/Icon";
import classNames from "classnames";

interface StepProps {
  onNext: () => void;
  onPrevious?: () => void;
  onStepData: (step: number, data: any) => void;
  prevData: {
    password: string;
  };
}
const Step3 = ({ onNext, onStepData, prevData }: StepProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(prevData?.password || "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNext();
  };

  const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    onStepData(3, {password: e.target.value})
  }

  const passwordInputClasses= classNames("relative border-2 border-gray-300 rounded-lg",{
    "border-red-600": password.length < 8 && password.length > 0,
    "focus-within:border-primary-base": password.length>=8
  })

  return (
    <form onSubmit={handleSubmit} className="h-full">

    <div className="flex flex-col justify-between px-20 h-full">
      <div>
      <div className="flex flex-col py-5">
        <Dialog.Title as="h2" className="relative text-3xl font-bold">
          You'll need a password
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-lg text-gray-500">
            Make sure it's 8 characters or more
          </p>
        </div>
      </div>
      <div className="py-3">
          <div className={passwordInputClasses}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder=" "
              minLength={8}
              required={true}
              className="block pt-3 mt-4 pb-2 px-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
              value={password}
              onChange={handlePasswordChange}
            />
            <label className="absolute top-0 text-lg text-gray-500 p-4 -z-10 duration-300 origin-0">
              Password
            </label>
            <button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              className="absolute  top-6 right-3 text-white hover:bg-gray-200 rounded-full focus:outline-none"
            >
              <ShowPasswordIcon className={" w-6 h-6"} isShow={showPassword} />
            </button>
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

export default Step3;
