import { UploadImageIcon } from "@icons/Icon";
import React, { useState } from "react";

interface IProps {
  chatImage: {
    avatar: File;
    avatarURL: string | undefined;
  };
  setImage: React.Dispatch<
    React.SetStateAction<{
      avatar: File;
      avatarURL: string | undefined;
    }>
  >;
}

const Avatar = ({ chatImage, setImage }: IProps) => {
  const [imagesAvailable, setAvailable] = useState(true);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file && file.type.includes("image")) {
      const url = URL.createObjectURL(file);
      setImage!({ avatar: file, avatarURL: url });
    }
  };

  return (
    <div className="flex relative rounded-full">
      <input
        id="chatImage"
        type="file"
        accept=".jpg, .jpeg, .png, .gif"
        multiple={false}
        onChange={handleImageChange}
        hidden
      />

      {chatImage.avatarURL && imagesAvailable ? (
        <div className="flex relative">
          <img
            src={chatImage.avatarURL}
            alt="chat avatar"
            className="w-[100px] h-[100px] brightness-75 rounded-full object-cover"
            onError={() => {
              setAvailable(false);
            }}
          />

          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <label htmlFor="chatImage" className="">
              <div className="bg-black/50 hover:bg-black/80 rounded-full duration-200">
                <div className="flex justify-center items-center w-12 h-12 cursor-pointer bg-gray- rounded-full">
                  <UploadImageIcon className="cursor-pointer w-5 h-5 text-white" />
                </div>
              </div>
            </label>
          </div>
        </div>
      ) : (
        <div className="flex relative">
          <div className="w-[100px] h-[100px] rounded-full bg-gray-50" />
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <label htmlFor="chatImage" className="">
              <div className="bg-black/50 hover:bg-black/80 rounded-full duration-200">
                <div className="flex justify-center items-center w-12 h-12 cursor-pointer bg-gray- rounded-full">
                  <UploadImageIcon className="cursor-pointer w-5 h-5 text-white" />
                </div>
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
