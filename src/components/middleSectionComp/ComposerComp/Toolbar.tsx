import React, { useRef, useState } from "react";
import {
  ImageIcon,
  PollIcon,
  ScheduleIcon,
  AddThreadIcon,
  GIFIcon,
} from "@icons/Icon";
import { ComposerComp } from "@components/index";
import { TenorImage } from "gif-picker-react";
import classNames from "classnames";
import {IComposer, IPoll} from "@customTypes/ComposerTypes"

type Props = {
  composerMode: string | undefined;
  
  ComposerSettings: IComposer
  setComposerSettings: React.Dispatch<React.SetStateAction<IComposer>>
  
  pollSettings: IPoll;
  setPollSettings: React.Dispatch<React.SetStateAction<IPoll>>;

  tweetText: string;
  setTweetText: React.Dispatch<React.SetStateAction<string>>;
  
  tenorGif: TenorImage | undefined;
  setTenorGif: React.Dispatch<React.SetStateAction<TenorImage | undefined>>;
  
  handleSubmit: React.MouseEventHandler<HTMLButtonElement>;
};

const Toolbar = ({
  composerMode,
  ComposerSettings,
  tweetText,
  setComposerSettings,
  setTweetText,
  tenorGif,
  setTenorGif,
  pollSettings,
  setPollSettings,
  handleSubmit,
}: Props) => {
  const [showGifPicker, setShowGifPicker] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
  
    if (files) {
      // Map the files to the mediaFiles format
      const mediaFiles = Array.from(files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
        type: file.type.split("/")[0],
      }));
  
      setComposerSettings((prevSettings) => {
        // Separate the previous images and videos
        const prevImages = prevSettings.mediaFiles.filter((media) => media.type === "image");
        const prevVideos = prevSettings.mediaFiles.filter((media) => media.type === "video");
  
        // Separate the new images and videos
        const newImages = mediaFiles.filter((media) => media.type === "image");
        const newVideos = mediaFiles.filter((media) => media.type === "video");
  
        // Check if the new files violate the rules
        if (newVideos.length > 0 && prevImages.length > 0) return prevSettings;
        if (newImages.length > 0 && prevVideos.length > 0) return prevSettings;
  
        // Update the images and videos according to the rules
        const updatedImages = [...prevImages, ...newImages].slice(0, 4);
        const updatedVideos = newVideos.length > 0 ? [newVideos[0]] : prevVideos;
  
        // Return the updated mediaFiles state
        return {
          ...prevSettings,
          mediaFiles: [...updatedImages, ...updatedVideos],
        };
      });
      if(hiddenFileInput.current) {
        hiddenFileInput.current.value = "";
      }
    }
  };

  const hiddenFileInput = useRef<any>(null);

  const handleClickFileInput = (event: any) => {
    hiddenFileInput.current?.click();
  };

  const imageButtonClasses = classNames("w-fit p-2", {
    "hover:bg-primary-extraLight rounded-full": ComposerSettings.mediaFiles.length < 4 && !tenorGif && !pollSettings.showPoll && !ComposerSettings.mediaFiles.map((media) => media.type).includes("video"),
    "opacity-50": ComposerSettings.mediaFiles.length >= 4 || tenorGif || pollSettings.showPoll || ComposerSettings.mediaFiles.map((media) => media.type).includes("video")
  });

  const pollButtonClasses = classNames("w-fit p-2", {
    "hover:bg-primary-extraLight rounded-full cursor-pointer": ComposerSettings.mediaFiles.length===0 && !tenorGif && !pollSettings.showPoll,
    "opacity-50": ComposerSettings.mediaFiles.length>0 || tenorGif|| pollSettings.showPoll,
  });

  const gifButtonClasses = classNames("w-fit p-2", {
    "hover:bg-primary-extraLight rounded-full": ComposerSettings.mediaFiles.length === 0 && !tenorGif && !pollSettings.showPoll,
    "opacity-50":  ComposerSettings.mediaFiles.length > 0 || tenorGif || pollSettings.showPoll,
  });

  const tweetButtonClasses = classNames(
    "border h-full px-3 ml-3 rounded-full bg-primary-base text-white font-bold",
    {
        "hover:bg-primary-dark":  ComposerSettings.mediaFiles.length > 0 || tweetText.length > 0,
        "opacity-50": tweetText.length === 0 && ComposerSettings.mediaFiles.length === 0 && !tenorGif,
    }
  )

  return (
    <div className="flex">
      <div className="flex justify-between w-full my-3">
        <div className="w-full flex">
          <button
            type="button"
            onClick={handleClickFileInput}
            disabled={ComposerSettings.mediaFiles.length >= 4 || !!tenorGif || pollSettings.showPoll || ComposerSettings.mediaFiles.map((media) => media.type).includes("video")}
            className={imageButtonClasses}
          >
            <span className="w-8 h-8">
              <ImageIcon className="w-5 h-5 text-primary-base font-bold" />
            </span>
          </button>

          <input
            disabled={ComposerSettings.mediaFiles.length === 4}
            id="select-image"
            accept="image/*,video/*,.gif"
            className="hidden"
            ref={hiddenFileInput}
            multiple={true}
            type="file"
            onChange={handleImageChange}
          />

          <button
            onClick={() => {
              setShowGifPicker(true);
            }}
            type="button"
            disabled={ComposerSettings.mediaFiles.length > 0 || !!tenorGif || pollSettings.showPoll}
            className={gifButtonClasses}
          >
            <span className="text-primary-base">
              <GIFIcon className={"w-5 h-5 text-primary-base fill-current"} />
            </span>
          </button>

          {showGifPicker && (
            <ComposerComp.GIFMenu
              tenorGif={tenorGif}
              setTenorGif={setTenorGif}
              setShowGifPicker={setShowGifPicker}
            />
          )}

          <button
            type="button"
            disabled={ComposerSettings.mediaFiles.length>0 || !!tenorGif || pollSettings.showPoll}
            onClick={() =>
              setPollSettings({
                ...pollSettings,
                showPoll: true,
              })
            }
            className={pollButtonClasses}
          >
            <span className={"w-8 h-8"}>
              <PollIcon
                className={"w-5 h-5 text-primary-base fill-current font-bold"}
              />
            </span>
          </button>

          <ComposerComp.Emoji 
            setTweet={setTweetText} 
            composerMode={composerMode}
          />

          <button
            type="button"
            disabled={true}
            className="p-2 hover:bg-primary-extraLight w-fit rounded-full cursor-pointer"
          >
            <label className="cursor-pointer w-8 h-8">
              <ScheduleIcon
                className={"w-5 h-5 text-primary-base fill-current"}
              />
            </label>
          </button>
        </div>

        <div className="w-full h-full text-right">
          <div className="flex h-full justify-end items-center">
            {tweetText.length > 0 && (
              <>
                <ComposerComp.CircleProgressBar
                  value={tweetText.length}
                  limit={280}
                />
                {composerMode === "reply" ? null : (
                  <>
                    <div className="w-0.5 mx-3 h-full bg-gray-300"></div>
                    <div className="text-primary-base hover:bg-primary-extraLight border rounded-full p-1 cursor-pointer">
                      <AddThreadIcon className={"w-4 h-4"} />
                    </div>
                  </>
                )}
              </>
            )}
            <button
              disabled={ComposerSettings.mediaFiles.length === 0 && tweetText.length === 0 && !tenorGif}
              type="submit"
              className={tweetButtonClasses}
              onClick={handleSubmit}
            >
              {composerMode === "reply" ? "Reply" : "Tweet"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
