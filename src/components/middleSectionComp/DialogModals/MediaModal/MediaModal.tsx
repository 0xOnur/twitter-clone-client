import { useEffect, useCallback, useRef } from "react";
import { CancelIcon, LeftArrowIcon, RightArrowIcon } from "@icons/Icon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: { url: string; alt: string }[];
  currentImageIndex: number;
  setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
}

const MediaModal = ({
  isOpen,
  onClose,
  images,
  currentImageIndex,
  setCurrentImageIndex,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const totalImages = images.length;
  const currentImage = images[currentImageIndex];

  console.log(images);
  

  const handlePrev = () => {
    const newIndex = currentImageIndex - 1;
    if (newIndex >= 0) {
      setCurrentImageIndex(newIndex);
    }
  };

  const handleNext = () => {
    const newIndex = currentImageIndex + 1;
    if (newIndex < totalImages) {
      setCurrentImageIndex(newIndex);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleClose = useCallback(
    (event: MouseEvent) => {
      if (modalRef.current && modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    },
    [modalRef, onClose]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [handleClose]);

  return (
    <div onClick={(e) => e.stopPropagation()} className="fixed inset-0 z-50 flex items-center justify-center cursor-default">
      <div ref={modalRef} className="fixed inset-0 -z-10 bg-black opacity-80" />
      {/* Close Button */}
      <div className="absolute left-0 top-0 z-10">
        <div className="p-3 border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="p-3 bg-black hover:bg-opacity-60 rounded-full duration-200"
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
            <button className="flex p-3 justify-center bg-black hover:bg-opacity-60 rounded-full duration-200">
              <LeftArrowIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
      {/* Image */}
      <div className="z-10 text-black rounded-xl my-[15%] mx-[15%] overflow-hidden">
        <img
          className="object-cover w-full h-full max-h-90vh"
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
            <button className="flex p-3 justify-center bg-black hover:bg-opacity-60 rounded-full duration-200">
              <RightArrowIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaModal;
