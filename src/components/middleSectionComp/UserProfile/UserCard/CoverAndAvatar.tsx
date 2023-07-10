import { useState } from "react";
import { MediaModal } from "@components/middleSectionComp/DialogModals";

interface IProps {
  cover?: string;
  avatar?: string;
}

const CoverAndAvatar = ({ cover, avatar }: IProps) => {
  const [showMediaModal, setShowMediaModal] = useState({
    cover: false,
    avatar: false,
  });

  const [imagesAvailable, setAvailable] = useState({
    cover: true,
    avatar: true,
  })

  return (
    <div className="relative w-full h-full">
      {cover && imagesAvailable.cover ? (
        <div>
          <img
            onClick={() =>
              setShowMediaModal((prev) => ({ ...prev, cover: true }))
            }
            className="max-h-[200px] w-full object-cover cursor-pointer"
            src={cover}
            alt="Profile cover"
            onError={() => {
              setAvailable((prev) => ({ ...prev, cover: false }))
            }}
          />
          {showMediaModal.cover && (
            <MediaModal
              isOpen={showMediaModal.cover}
              onClose={() =>
                setShowMediaModal((prev) => ({ ...prev, cover: false }))
              }
              images={[{ url: cover, alt: "Profile cover" }]}
              currentImageIndex={0}
              setCurrentImageIndex={() => {}}
            />
          )}
        </div>
      ) : (
        <div className="h-[200px] bg-gray-defaultCover" />
      )}
      {avatar && imagesAvailable.avatar ? (
        <div>
          <img
            onClick={() =>
              setShowMediaModal((prev) => ({ ...prev, avatar: true }))
            }
            className="absolute z-10 -bottom-1/3 left-4 w-[145px] h-[145px] object-cover rounded-full border-4 border-white cursor-pointer"
            src={avatar}
            alt="Profile avatar"
            onError={() => {
              setAvailable((prev) => ({ ...prev, avatar: false }))
            }}
          />
          {showMediaModal.avatar && (
            <MediaModal
              isOpen={showMediaModal.avatar}
              onClose={() =>
                setShowMediaModal((prev) => ({ ...prev, avatar: false }))
              }
              images={[{ url: avatar, alt: "Profile avatar" }]}
              currentImageIndex={0}
              setCurrentImageIndex={() => {}}
            />
          )}
        </div>
      ) : (
        <div className="absolute -bottom-1/3 left-4 w-[145px] h-[145px] rounded-full border-4 border-white bg-gray-50" />
      )}
    </div>
  );
};

export default CoverAndAvatar;
