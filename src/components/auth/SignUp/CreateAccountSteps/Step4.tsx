import React, { useRef } from "react";
import { UploadImageIcon, CancelIcon } from "@icons/Icon";
import classNames from "classnames";

interface StepProps {
  onNext: () => void;
  onStepData: (data: {avatar: File | null, avatarURL: string | null}) => void;
  user: {
    avatar: File | null;
    avatarURL: string;
  };
}

const Step4 = ({ onNext, onStepData, user }: StepProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file && file.type.includes("image")) {
      const url = URL.createObjectURL(file);
      onStepData({avatar: file, avatarURL: url});
    }
  };

  const removeAvatar = () => {
    onStepData({avatar: null, avatarURL: null});
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const nextOrSkipButtonClasses = classNames("w-full h-full rounded-full", {
    "bg-black text-white hover:brightness-200": user.avatar,
    "bg-gray-300 hover:bg-gray-200": !user.avatar,
  });

  return (
    <div className="flex flex-col justify-between px-20 h-full">
      <div>
        <div className="flex flex-col py-5">
          <h2 className="relative text-3xl font-bold ">
            Pick a profile picture
          </h2>
          <div className="mt-2">
            <p className="text-lg text-gray-500">
              Have a favorite selfie? Upload it now
            </p>
          </div>
        </div>
        <div className="flex justify-center py-10">
          <input
            id="avatar"
            type="file"
            accept=".jpg, .jpeg, .png, .gif"
            multiple={false}
            onChange={handleAvatarChange}
            ref={inputFileRef}
            hidden
          />
          <div className="flex relative justify-center items-center bg-gray-400 w-60 h-60 rounded-full">
            {user.avatar ? (
              <>
                <img
                  src={user.avatarURL}
                  alt="Profile"
                  className="relative w-full h-full object-cover rounded-full"
                />
                <button
                  className="flex absolute items-center justify-center bottom-0 right-5 w-14 h-14 bg-primary-base hover:bg-primary-dark rounded-full"
                  onClick={removeAvatar}
                >
                  <CancelIcon className="w-6 h-6 text-white" />
                </button>
              </>
            ) : (
              <>
                <img
                  src="https://res.cloudinary.com/dwcw9iftp/image/upload/v1683417676/Twitter/Users/Avatar/default_profile_400x400_dctbia.png"
                  className="rounded-full"
                  alt="default profile"
                />
                <label htmlFor="avatar">
                  <div className="absolute bottom-0 right-5 bg-primary-base hover:bg-primary-dark rounded-full">
                    <div className="flex justify-center items-center w-14 h-14 cursor-pointer bg-gray- rounded-full">
                      <UploadImageIcon className="cursor-pointer w-6 h-6 text-white" />
                    </div>
                  </div>
                </label>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="h-14 my-3">
          <button
            className={nextOrSkipButtonClasses}
            onClick={onNext}
          >
            <div className="flex flex-row justify-center items-center">
              <span className="font-bold">{user.avatar ? "Next" : "Skip"}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4;
