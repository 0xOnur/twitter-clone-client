import { clearMessageMedia } from "@redux/slices/chatSlice";
import { TenorImage } from "gif-picker-react";
import { RemoveItemIcon } from "@icons/Icon";
import { useDispatch } from "react-redux";

interface IProps {
  tenorGif: TenorImage | undefined;
  messageMedia: {
    mediaFile: File | undefined;
    mediaURL: string;
  };
}

const Media = ({
  tenorGif,
  messageMedia,
}: IProps) => {
  const dispatch = useDispatch();
  const mediaType = messageMedia.mediaFile?.type.split("/")[0];

  const handleCleanMedia = () => {
    dispatch(clearMessageMedia());
  };

  return (
    <div className="flex max-h-[10rem] w-full m-3 pl-2">
      <div className="flex relative w-fit">
        {mediaType === "image" || mediaType === "gif" || tenorGif ? (
          <img
            src={messageMedia.mediaURL || tenorGif?.preview.url}
            alt="chatImage"
            className="max-h-[150px] object-cover rounded-2xl overflow-hidden"
          ></img>
        ) : (
          <video
            src={messageMedia.mediaURL}
            controls
            className="max-h-[150px] object-cover rounded-2xl overflow-hidden"
          />
        )}

        <div className="absolute top-1 right-1">
          <button
            type="button"
            onClick={handleCleanMedia}
            className="bg-gray-900 hover:bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center"
          >
            <RemoveItemIcon className={"w-5 h-5"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Media;
