import { CancelIcon, LeftArrowIcon, RightArrowIcon } from "@icons/Icon";
import { useState, useEffect, useCallback } from "react";

interface ModalProps {
  closeModal: () => void;
  images: { url: string; alt?: string }[];
  imageIndex?: number;
}

const MediaModal = ({ closeModal, images, imageIndex }: ModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(imageIndex || 0);

  const totalImages = images.length;
  const currentImage = images[currentImageIndex];

  const handlePrev = useCallback(() => {
    if (setCurrentImageIndex) {
      const newIndex = currentImageIndex - 1;
      if (newIndex >= 0) {
        setCurrentImageIndex(newIndex);
      }
    }
  }, [currentImageIndex]);

  const handleNext = useCallback(() => {
    if (setCurrentImageIndex) {
      const newIndex = currentImageIndex + 1;
      if (newIndex < totalImages) {
        setCurrentImageIndex(newIndex);
      }
    }
  }, [currentImageIndex, totalImages]);

  //keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext, handlePrev]);

  return (
    <div className="flex items-center justify-center w-fit h-fit">
      {/* Close Button */}
      <div className="absolute left-0 top-0 z-10">
        <div className="p-3 border-gray-200">
          <button
            type="button"
            onClick={closeModal}
            className="p-3 bg-black hover:bg-opacity-75 rounded-full duration-200"
          >
            <CancelIcon className={"w-5 h-5 text-white"} />
          </button>
        </div>
      </div>
      {/* Prev Button */}
      {currentImageIndex > 0 && (
        <div className="absolute z-10 left-0 pl-3 text-white">
          <div
            onClick={handlePrev}
            className="flex items-center min-w-[36px] min-h-[36px] m-3"
          >
            <button className="flex p-3 justify-center bg-black hover:bg-opacity-75 rounded-full duration-200">
              <LeftArrowIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
      {/* Image */}
      <div className="text-black rounded-xl overflow-hidden">
        <img
          className="object-cover w-full h-full max-h-90vh max-w-900px"
          src={currentImage.url}
          alt={currentImage.alt}
        />
        {/* show there alt */}
        {currentImage.alt && (
          <div className="p-3 bg-white/80 backdrop-blur-md border-gray-200">
            <p className="text-lg">{currentImage.alt}</p>
          </div>
        )}
      </div>
      {/* Next Button */}
      {currentImageIndex + 1 < totalImages && (
        <div className="absolute z-10 right-0 pl-3 text-white">
          <div
            onClick={handleNext}
            className="flex items-center min-w-[36px] min-h-[36px] m-3"
          >
            <button className="flex p-3 justify-center bg-black hover:bg-opacity-75 rounded-full duration-200">
              <RightArrowIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaModal;
