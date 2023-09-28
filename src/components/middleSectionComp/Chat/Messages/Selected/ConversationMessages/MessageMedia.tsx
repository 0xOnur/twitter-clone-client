import { MediaModal } from "@components/middleSectionComp/DialogModals";
import classNames from "classnames";
import { useModal } from "contexts/ModalContext";
import React from "react";

interface IProps {
  mediaURL: string;
  mediaType: "image" | "video";
  imageSize?: string;
  videoSize?: string;
}

const MessageMedia = ({
  mediaURL,
  mediaType,
  imageSize,
  videoSize,
}: IProps) => {
  const { openModal, closeModal } = useModal();

  const handleOpenImage = () => {
    openModal(
      <MediaModal images={[{ url: mediaURL }]} closeModal={closeModal} />
    );
  };

  const imageClassNames = classNames(
    "cursor-pointer rounded-3xl object-cover",
    imageSize
  );
  
  const videoClassNames = classNames("rounded-3xl object-cover",
    videoSize
  );

  return (
    <div>
      {mediaType === "image" ? (
        <img
          src={mediaURL}
          onClick={() => {
            handleOpenImage();
          }}
          alt="message media"
          className={imageClassNames}
        />
      ) : (
        <video src={mediaURL} className={videoClassNames} controls />
      )}
    </div>
  );
};

export default MessageMedia;
