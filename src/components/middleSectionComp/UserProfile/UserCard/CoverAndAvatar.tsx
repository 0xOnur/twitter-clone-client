import React from "react";

interface IProps {
  cover?: string;
  avatar?: string;
}

const CoverAndAvatar = ({ cover, avatar }: IProps) => {
  return (
    <div className="relative w-full h-full">
      {cover ? (
        <div className="">
          <img
            className="max-h-[200px] w-full object-cover"
            src={cover}
            alt="cover"
          />
        </div>
      ) : (
        <div className="h-[200px] bg-gray-defaultCover" />
      )}
      {avatar ? (
        <img
          className="absolute z-10 -bottom-1/3 left-4 w-[145px] h-[145px] rounded-full border-4 border-white"
          src={avatar}
          alt="Profile"
        />
      ) : (
        <div className="absolute -bottom-1/3 left-4 w-[145px] h-[145px] rounded-full border-4 border-white bg-gray-50" />
      )}
    </div>
  );
};

export default CoverAndAvatar;
