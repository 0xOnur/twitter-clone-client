import { GIFIcon } from "@icons/Icon";
import { useModal } from "contexts/ModalContext";
import React from "react";
import { setTenorGif } from "@redux/slices/chatComposerSlice";
import { ComposerComp } from "@components/middleSectionComp";

const GifButton = () => {
  const { openModal, closeModal } = useModal();

  const handleGif = () => {
    openModal(
      <ComposerComp.GIFMenu setAction={setTenorGif} closeModal={closeModal} />
    );
  };

  return (
    <button
      title="Gif"
      onClick={handleGif}
      className="relative w-fit p-2 group"
    >
      <div className="absolute inset-0 w-full h-full rounded-full group-hover:bg-[color:var(--color-primary)] opacity-10" />
      <span className="w-8 h-8">
        <GIFIcon className="w-5 h-5 text-[color:var(--color-primary)]" />
      </span>
    </button>
  );
};

export default GifButton;
