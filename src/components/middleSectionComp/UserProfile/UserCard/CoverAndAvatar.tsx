import { MediaModal } from "@components/middleSectionComp/DialogModals";
import { useModal } from "contexts/ModalContext";
import { useState } from "react";

interface IProps {
  cover: string;
  avatar: string;
}

const CoverAndAvatar = ({ cover, avatar }: IProps) => {
  const { openModal, closeModal } = useModal();

  const [imagesAvailable, setAvailable] = useState({
    cover: true,
    avatar: true,
  });

  const handleOpenAvatar = () => {
    openModal(
      <MediaModal closeModal={closeModal} images={[{ url: avatar }]} />
    );
  };

  const handleOpenCover = () => {
    openModal(<MediaModal closeModal={closeModal} images={[{ url: cover }]} />);
  };

  return (
    <div className="relative w-full h-full">
      {cover && imagesAvailable.cover ? (
        <div>
          <img
            onClick={() => {
              handleOpenCover();
            }}
            className="max-h-[200px] w-full object-cover cursor-pointer"
            src={cover}
            alt="Profile cover"
            onError={() => {
              setAvailable((prev) => ({ ...prev, cover: false }));
            }}
          />
        </div>
      ) : (
        <div className="h-[200px] bg-gray-defaultCover" />
      )}
      {avatar && imagesAvailable.avatar ? (
        <div>
          <img
            onClick={() => {
              handleOpenAvatar()
            }}
            className="absolute z-10 -bottom-1/3 left-4 w-[145px] h-[145px] object-cover rounded-full border-4 border-white cursor-pointer"
            src={avatar}
            alt="Profile avatar"
            onError={() => {
              setAvailable((prev) => ({ ...prev, avatar: false }));
            }}
          />
        </div>
      ) : (
        <div className="absolute -bottom-1/3 left-4 w-[145px] h-[145px] rounded-full border-4 border-white bg-gray-50" />
      )}
    </div>
  );
};

export default CoverAndAvatar;
