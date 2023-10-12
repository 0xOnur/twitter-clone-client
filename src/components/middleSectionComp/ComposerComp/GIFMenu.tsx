import React from "react";
import GifPicker, { TenorImage } from "gif-picker-react";
import { useDispatch } from "react-redux";
import { ActionCreatorWithOptionalPayload } from "@reduxjs/toolkit";

interface IProps {
  setAction: ActionCreatorWithOptionalPayload<TenorImage | undefined>;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const GIFMenu = ({ setAction, closeModal }: IProps) => {
  const dispatch = useDispatch();
  const gifPickerApi = process.env.REACT_APP_TENOR_API;

  const onGifClick = (selectedGif: TenorImage) => {
    closeModal(false);
    dispatch(setAction(selectedGif));
  };

  return (
    <div className="z-10 text-black bg-white  rounded-xl overflow-hidden">
      <div className=" max-h-90vh">
        <GifPicker
          tenorApiKey={gifPickerApi || ""}
          clientKey="twitter_clone"
          onGifClick={onGifClick}
          width={500}
          height={650}
        />
      </div>
    </div>
  );
};

export default GIFMenu;
