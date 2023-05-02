import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

interface StepProps {
  onStepData: (step: number, data: any) => void;
  prevData: {
    bio: string;
  };
}

const Step6 = ({ onStepData, prevData }: StepProps) => {
  const [bio, setBio] = useState<string>(prevData?.bio || "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onStepData(6, {bio: bio});
  };

  return (
    <form onSubmit={handleSubmit} className="h-full">
      <div className="flex flex-col justify-between px-20 h-full">
        <div>
          <div className="flex flex-col py-5">
            <Dialog.Title as="h2" className="relative text-3xl font-bold ">
              Describe yourself
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-lg text-gray-500">
                What makes you special? Don't think too hard, just have fun with it.
              </p>
            </div>
          </div>
          <div className="py-3">
            <div className="relative border-2 border-gray-300 rounded-lg focus-within:border-primary-base">
              <input
                type="text"
                placeholder=" "
                required={true}
                maxLength={160}
                className="block pt-3 mt-4 pb-2 px-2 w-full text-lg appearance-none focus:outline-none bg-transparent"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <label className="absolute top-0 text-lg text-gray-500 p-4 -z-10 duration-300 origin-0">
                Your bio
              </label>
              <label htmlFor="Choice1" className="second-label text-lg p-4">
                {bio.length} / 160
              </label>
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
                <span className="font-bold">{bio ? "Next" : "Skip"}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Step6;
