import { ImageIcon } from "@icons/Icon";
import { setMessageMedia } from "@redux/slices/chatComposerSlice";
import React from "react";
import { useDispatch } from "react-redux";

const ImageButton = () => {
  const dispatch = useDispatch();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const url = URL.createObjectURL(file);

    dispatch(setMessageMedia({ mediaFile: file, mediaURL: url }));
  };

  return (
    <div>
      <input
        id="chatMedia"
        type="file"
        accept="image/*,video/*,.gif"
        multiple={false}
        onChange={handleImageChange}
        hidden
      />
      <label htmlFor="chatMedia" className="cursor-pointer" title="Media">
        <div className="relative w-fit p-2 group">
          <div className="absolute inset-0 w-full h-full rounded-full group-hover:bg-[color:var(--color-primary)] opacity-10" />
          <span className="w-8 h-8">
            <ImageIcon className="w-5 h-5 text-[color:var(--color-primary)]" />
          </span>
        </div>
      </label>
    </div>
  );
};

export default ImageButton;
