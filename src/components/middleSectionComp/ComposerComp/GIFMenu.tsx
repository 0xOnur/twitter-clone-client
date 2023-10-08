import React from "react";
import GifPicker, { TenorImage } from "gif-picker-react";

interface IProps {
  tenorGif: TenorImage | undefined;
  setTenorGif: React.Dispatch<React.SetStateAction<TenorImage | undefined>>;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const GIFMenu = ({ tenorGif, setTenorGif, closeModal }: IProps) => {
  const gifPickerApi = process.env.REACT_APP_TENOR_API;

  const onGifClick = (selectedGif: TenorImage) => {
    closeModal(false);
    setTenorGif(selectedGif);
  };

  console.log(tenorGif);

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
