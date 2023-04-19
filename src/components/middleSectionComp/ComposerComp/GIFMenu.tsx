import React, { useRef, useCallback, useEffect } from "react";
import GifPicker, { TenorImage } from "gif-picker-react";

interface IProps {
  tenorGif: TenorImage | undefined;
  setTenorGif: React.Dispatch<React.SetStateAction<TenorImage | undefined>>;
  setShowGifPicker: React.Dispatch<React.SetStateAction<boolean>>
}

const GIFMenu: React.FC<IProps> = ({tenorGif, setTenorGif, setShowGifPicker}) => {
  const gifPickerApi = process.env.REACT_APP_TENOR_API;

  const gifRef = useRef<HTMLDivElement>(null);


  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (
        gifRef.current &&
        !gifRef.current.contains(event.target as Node)
      ) {
        setShowGifPicker(false);
      }
    },
    [setShowGifPicker]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);


  const onGifClick = (selectedGif: TenorImage) => {
    setShowGifPicker(false);
    setTenorGif(selectedGif)
  };

  console.log(tenorGif)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex place-items-start justify-center z-50">
      <div ref={gifRef} className="absolute top-16">
        <GifPicker
          tenorApiKey={gifPickerApi || ""}
          clientKey="twitter_clone"
          onGifClick={onGifClick}
          width={600}
          height={650}
        />
      </div>
    </div>
  );
};

export default React.memo(GIFMenu);
