import { RemoveItemIcon } from "@icons/Icon";
import { TenorImage } from "gif-picker-react";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { removeMediaFile, setTenorGif } from "@redux/slices/composerSlice";

type Props = {
  tenorGif: TenorImage | undefined;
  mediaFiles: {
    file: File;
    url: string;
    type: string;
  }[];
};

const MediaCard = ({ tenorGif, mediaFiles }: Props) => {
  const dispatch = useDispatch();

  const handleDeleteImage = (indexToDelete: number) => {
    dispatch(removeMediaFile(indexToDelete));
  };

  const handleDeleteGif = () => {
    dispatch(setTenorGif(undefined));
  };

  const mediaGridClasses = classNames("grid gap-0.5 mb-1", {
    "grid-cols-1": mediaFiles.length <= 1,
    "grid-cols-2": mediaFiles.length > 1,
  });

  const gridItemClasses = (index: number) =>
    classNames("relative", {
      "row-span-2 h-full": mediaFiles.length === 3 && index === 0,
    });

  const imageClasses = (index: number) =>
    classNames("w-full object-cover", {
      "h-full rounded-tl-xl rounded-bl-xl":
        mediaFiles.length === 3 && index === 0,
      "h-56": mediaFiles.length > 3 || index !== 0 || mediaFiles.length === 2,

      "rounded-xl": mediaFiles.length === 1,

      "rounded-tl-xl rounded-bl-xl": mediaFiles.length === 2 && index === 0,
      "rounded-tr-xl rounded-br-xl": mediaFiles.length === 2 && index === 1,

      "rounded-tl-xl": (mediaFiles.length === 3 || 4) && index === 0,
      "rounded-tr-xl": (mediaFiles.length === 3 || 4) && index === 1,
      "rounded-br-xl":
        (mediaFiles.length === 3 && index === 2) ||
        (mediaFiles.length === 4 && index === 3),
      "rounded-bl-xl": mediaFiles.length === 4 && index === 2,
    });

  return (
    <div className={mediaGridClasses}>
      {mediaFiles.length > 0
        ? mediaFiles.map((media, index) => (
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
                onClick={handleDeleteGif}
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
