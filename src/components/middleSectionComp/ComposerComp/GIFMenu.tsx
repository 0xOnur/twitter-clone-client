import React, { useState, useRef, useCallback, useEffect } from "react";
import GifPicker, { TenorImage } from "gif-picker-react";
import { GIFIcon } from "@icons/Icon";

interface IProps {
  tenorGif: TenorImage | undefined;
  setTenorGif: React.Dispatch<React.SetStateAction<TenorImage | undefined>>;
  gifAvailable: boolean;
}

const GIFMenu: React.FC<IProps> = ({tenorGif, setTenorGif, gifAvailable}) => {
  const gifPickerApi = process.env.REACT_APP_TENOR_API;

  const [showGifPicker, setShowGifPicker] = useState(false);

  const gifRef = useRef<HTMLDivElement>(null);
  const gifButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (
        gifRef.current &&
        !gifRef.current.contains(event.target as Node) &&
        (!gifButtonRef.current ||
          !gifButtonRef.current.contains(event.target as Node))
      ) {
        setShowGifPicker(false);
      }
    },
    [gifRef]
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
    <div>
      <button
        ref={gifButtonRef}
        type="button"
        disabled={!gifAvailable}
        onClick={() => setShowGifPicker(!showGifPicker)}
        className={`w-fit p-2 ${!gifAvailable ? "opacity-50": "hover:bg-primary-extraLight rounded-full"}` }
      >
        <label className={`w-8 h-8 ${gifAvailable && ("cursor-pointer")} `}>
          <GIFIcon className={"w-5 h-5 text-primary-base fill-current"} />
        </label>
      </button>
      {showGifPicker && (
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
      )}
    </div>
  );
};

export default GIFMenu;
