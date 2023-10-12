import { ComposerState, setMediaFiles } from "@redux/slices/composerSlice";
import { useDispatch } from "react-redux";
import { ImageIcon } from "@icons/Icon";
import useToast from "@hooks/useToast";
import React, { useRef } from "react";
import classNames from "classnames";

interface IProps {
  composer: ComposerState;
}

const ImageButton = ({ composer }: IProps) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (files) {
      // Map the files to the mediaFiles format
      const mediaFiles = Array.from(files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
        type: file.type.split("/")[0],
      }));

      const mediaArray =
        composer.mediaFiles.length > 0
          ? [...composer.mediaFiles, ...mediaFiles]
          : mediaFiles;

      const mediaImages = mediaArray.filter((media) => media.type === "image");
      const mediaVideos = mediaArray.filter((media) => media.type === "video");

      if (mediaVideos.length > 0 && mediaImages.length > 0) {
        showToast("Please choose either 1 GIF/Video or up to 4 photos.", "error");
        return;
      }

      if (mediaArray.length > 4) {
        showToast("Please choose either 1 GIF or up to 4 photos.", "error");
        return;
      }

      dispatch(setMediaFiles(mediaArray));

      if (hiddenFileInput.current) {
        hiddenFileInput.current.value = "";
      }
    }
  };

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClickFileInput = () => {
    hiddenFileInput.current?.click();
  };

  const imageButtonClasses = classNames("w-fit p-2", {
    "hover:bg-primary-extraLight rounded-full":
      composer.mediaFiles.length < 4 &&
      composer.tenorGif &&
      !composer.showPoll &&
      composer.mediaFiles.map((media) => media.type).includes("video"),
    "opacity-50":
      composer.mediaFiles.length >= 4 ||
      composer.tenorGif ||
      composer.showPoll ||
      composer.mediaFiles.map((media) => media.type).includes("video"),
  });

  return (
    <div>
      <button
        type="button"
        onClick={handleClickFileInput}
        disabled={
          composer.mediaFiles.length >= 4 ||
          !!composer.tenorGif ||
          composer.showPoll ||
          composer.mediaFiles.map((media) => media.type).includes("video")
        }
        className={imageButtonClasses}
      >
        <span className="w-8 h-8">
          <ImageIcon className="w-5 h-5 text-primary-base font-bold" />
        </span>
      </button>

      <input
        disabled={composer.mediaFiles.length === 4}
        id="select-image"
        accept="image/*,video/*,.gif"
        className="hidden"
        ref={hiddenFileInput}
        multiple={true}
        type="file"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageButton;
