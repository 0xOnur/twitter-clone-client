import React, { useState, useRef, useCallback, useEffect } from "react";
import GifPicker, { TenorImage } from "gif-picker-react";
import { GIFIcon } from "@icons/Icon";

interface IProps {
    setMediaURLs: React.Dispatch<React.SetStateAction<{
        url: string;
        type: "image" | "video" | "gif";

    }[]>>,
    mediaURLs: {
        url: string;
        type: "image" | "video" | "gif";

      }[];
}



const GIFMenu: React.FC<IProps> = ({setMediaURLs, mediaURLs}) => {
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
    console.log(selectedGif)
    setShowGifPicker(false);
    setMediaURLs((prevMediaURLs) => [
      ...prevMediaURLs,
      {
        url: selectedGif.url,
        type: "gif",

      },
    ]);
  
  };

  console.log(mediaURLs)

  return (
    <div>
      <button
        ref={gifButtonRef}
        type="button"
        disabled={mediaURLs.length>0}
        onClick={() => setShowGifPicker(!showGifPicker)}
        className={`w-fit p-2 'hover:bg-primary-extraLight  rounded-full' ${
            mediaURLs.length>0 && "opacity-50"
          }`}
      >
        <label className={`w-8 h-8 ${mediaURLs.length<=0 && ("cursor-pointer")}`}>
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
