import { ImageIcon } from "@icons/Icon";
import { setMessageMedia } from "@redux/slices/chatSlice";
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

      <div>
        <label
          htmlFor="chatMedia"
          title="Image"
          className="flex min-w-[36px] min-h-[36px] items-center rounded-full hover:bg-primary-hover duration-200 cursor-pointer"
        >
          <div className="flex flex-grow justify-center items-center font-bold">
            <ImageIcon className="w-5 h-5 fill-primary-base" />
          </div>
        </label>
      </div>
    </div>
  );
};

export default ImageButton;
