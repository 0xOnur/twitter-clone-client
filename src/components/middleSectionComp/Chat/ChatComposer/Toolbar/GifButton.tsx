import { GIFIcon } from "@icons/Icon";
import { useModal } from "contexts/ModalContext";
import React from "react";
import { setTenorGif } from "@redux/slices/chatSlice";
import { ComposerComp } from "@components/middleSectionComp";

const GifButton = () => {
  const { openModal, closeModal } = useModal();

  const handleGif = () => {
    openModal(
        <ComposerComp.GIFMenu
        setAction={setTenorGif}
        closeModal={closeModal}
      />
    );
  }

  return (
    <button
      title="GIF"
      onClick={handleGif}
      className="flex min-w-[36px] min-h-[36px] items-center rounded-full hover:bg-primary-hover duration-200 disabled:cursor-not-allowed"
    >
      <div className="flex flex-grow justify-center items-center font-bold">
        <GIFIcon className="w-5 h-5 fill-primary-base" />
      </div>
    </button>
  );
};

export default GifButton;
