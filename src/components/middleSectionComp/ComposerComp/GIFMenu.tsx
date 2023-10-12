import React from "react";
import GifPicker, { TenorImage } from "gif-picker-react";
import { ComposerState } from "@redux/slices/composerSlice";
import { useDispatch } from "react-redux";
import { setTenorGif } from "@redux/slices/composerSlice";

interface IProps {
  composer: ComposerState;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const GIFMenu = ({ closeModal }: IProps) => {
  const dispatch = useDispatch();
  const gifPickerApi = process.env.REACT_APP_TENOR_API;

  const onGifClick = (selectedGif: TenorImage) => {
    closeModal(false);
    dispatch(setTenorGif(selectedGif));
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
