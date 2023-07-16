import React from "react";
import classNames from "classnames";
import { TenorImage } from "gif-picker-react";
import { RemoveItemIcon } from "@icons/Icon";

type Props = {
  ComposerSettings: IComposer;
  setComposerSettings: React.Dispatch<React.SetStateAction<IComposer>>;
  tenorGif: TenorImage | undefined;
  setTenorGif: React.Dispatch<React.SetStateAction<TenorImage | undefined>>;
};

const MediaCard = ({
  ComposerSettings,
  tenorGif,
  setTenorGif,
  setComposerSettings,
}: Props) => {
    
  const handleDeleteImage = (indexToDelete: number) => {
    setComposerSettings((prevmediaURLs) => ({
      ...prevmediaURLs,
      mediaFiles: prevmediaURLs.mediaFiles.filter(
        (media, index) => index !== indexToDelete
      ),
    }));
  };


  const mediaGridClasses = classNames("grid gap-0.5 mb-1", {
    "grid-cols-1": ComposerSettings?.mediaFiles!.length <= 1,
    "grid-cols-2": ComposerSettings?.mediaFiles!.length > 1,
  });

  const gridItemClasses = (index: number) =>
    classNames("relative",{
      "row-span-2 h-full": ComposerSettings?.mediaFiles!.length === 3 && index === 0,
    });
  

  const imageClasses = (index: number) =>
    classNames("w-full object-cover", {
      "h-full rounded-tl-xl rounded-bl-xl":  ComposerSettings.mediaFiles?.length === 3 && index === 0,
      "h-56": (ComposerSettings?.mediaFiles!.length > 3 || index !== 0) || ComposerSettings.mediaFiles!.length === 2,
      
      "rounded-xl": ComposerSettings?.mediaFiles?.length === 1,
      
      "rounded-tl-xl rounded-bl-xl": ComposerSettings?.mediaFiles!.length === 2 && index === 0,
      "rounded-tr-xl rounded-br-xl": ComposerSettings?.mediaFiles!.length === 2 && index === 1,

      "rounded-tl-xl": (ComposerSettings?.mediaFiles!.length === 3 || 4) && index === 0,
      "rounded-tr-xl": (ComposerSettings?.mediaFiles!.length === 3 || 4) && index === 1,
      "rounded-br-xl": (ComposerSettings?.mediaFiles!.length === 3 && index === 2) || (ComposerSettings?.mediaFiles!.length === 4 && index === 3),
      "rounded-bl-xl": ComposerSettings?.mediaFiles!.length === 4 && index === 2,
    });

  return (
    <div className={mediaGridClasses}>
      {ComposerSettings.mediaFiles.length > 0
        ? ComposerSettings.mediaFiles.map((media, index) => (
            <div key={index} className={gridItemClasses(index)}>
              {media.type === "image" || media.type === "gif" ? (
                <img
                  src={media.url}
                  alt={`Selected file ${index + 1}`}
                  className={imageClasses(index)}
                />
              ) : (
                <video
                  src={media.url}
                  className={"w-full rounded-xl object-cover h-full"}
                  controls
                />
              )}
              <button
                type="button"
                onClick={() => handleDeleteImage(index)}
                className="absolute left-2 top-2 bg-gray-900 hover:bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                <RemoveItemIcon className={"w-5 h-5"} />
              </button>
            </div>
          ))
        : tenorGif && (
            <div className="relative">
              <img
                src={tenorGif?.preview.url}
                alt={`${tenorGif?.description}`}
                className="w-full rounded-xl object-cover h-full"
              />

              <button
                type="button"
                onClick={() => setTenorGif(undefined)}
                className="absolute left-2 top-2 bg-gray-900 hover:bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                <RemoveItemIcon className={"w-5 h-5"} />
              </button>
            </div>
          )}
    </div>
  );
};

export default MediaCard;
