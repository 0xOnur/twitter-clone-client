import React from "react";
import classNames from "classnames";
import { TenorImage } from "gif-picker-react";
import { RemoveItemIcon } from "@icons/Icon";

type Props = {
  ComposerSettings: {
    Audience: string;
    whoCanReply: string;
    mediaFiles: {
      file: File;
      url: string;
      type: string;
    }[];
  };
  setComposerSettings: React.Dispatch<
    React.SetStateAction<{
      Audience: string;
      whoCanReply: string;
      mediaFiles: {
        file: File;
        url: string;
        type: string;
      }[];
    }>
  >;
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

  const mediaGridClasses = classNames("grid gap-2 mb-1", {
    "grid-cols-1": ComposerSettings.mediaFiles.length <= 1 || tenorGif,
    "grid-cols-2": ComposerSettings.mediaFiles.length > 1,
  });

  const imageClasses = classNames("w-full rounded-xl object-cover", {
    "h-36": ComposerSettings.mediaFiles.length > 1,
  });

  return (
    <div className={mediaGridClasses}>
      {ComposerSettings.mediaFiles.length > 0
        ? ComposerSettings.mediaFiles.map((media, index) => (
            <div key={index} className="relative">
              {media.type === "image" || media.type === "gif" ? (
                <img
                  src={media.url}
                  alt={`Selected file ${index + 1}`}
                  className={imageClasses}
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
