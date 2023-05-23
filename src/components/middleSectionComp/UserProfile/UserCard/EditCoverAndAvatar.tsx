import { CancelIcon, UploadImageIcon } from "@icons/Icon";
import { useRef } from "react";

interface IProps {
  cover: {
    coverFile: File | undefined;
    coverURL: string | null;
  };
  setCover: React.Dispatch<
    React.SetStateAction<{
      coverFile: File | undefined;
      coverURL: string | null;
    }>
  >;
  avatar: {
    avatar: File | null;
    avatarURL: string | null;
  };
  setAvatar: React.Dispatch<
    React.SetStateAction<{
      avatar: File | null;
      avatarURL: string | null;
    }>
  >;
}

const EditCoverAndAvatar = ({ cover, setCover, avatar, setAvatar }: IProps) => {
  const coverInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file && file.type.includes("image")) {
      const url = URL.createObjectURL(file);
      setCover!({ coverFile: file, coverURL: url });
    }
  };

  const removeCover = () => {
    setCover!({ coverFile: undefined, coverURL: null });
    if (coverInputRef.current) {
      coverInputRef.current.value = "";
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (file && file.type.includes("image")) {
      const url = URL.createObjectURL(file);
      setAvatar!({ avatar: file, avatarURL: url });
    }
  };

  return (
    <div className="relative w-full h-full">
      <input
        id="cover"
        type="file"
        accept=".jpg, .jpeg, .png, .gif"
        multiple={false}
        onChange={handleCoverChange}
        ref={coverInputRef}
        hidden
      />
      <input
        id="avatar"
        type="file"
        accept=".jpg, .jpeg, .png, .gif"
        multiple={false}
        onChange={handleAvatarChange}
        ref={avatarInputRef}
        hidden
      />
      {cover.coverURL ? (
        <div className="relative">
          <img
            className="max-h-[200px] w-full brightness-75 object-cover"
            src={cover.coverURL!}
            alt="cover"
          />

          <label htmlFor="cover">
            <div className="absolute top-[40%] left-1/3 bg-black/50 hover:bg-black/80 rounded-full">
              <div className="flex justify-center items-center w-12 h-12 cursor-pointer bg-gray- rounded-full">
                <UploadImageIcon className="cursor-pointer w-6 h-6 text-white" />
              </div>
            </div>
          </label>
          <button
            onClick={removeCover}
            className="flex absolute w-12 h-12 top-[40%] left-1/2 items-center justify-center bg-black/50 hover:bg-black/80 duration-200 rounded-full"
          >
            <CancelIcon className="w-5 h-5 text-white" />
          </button>
        </div>
      ) : (
        <div className="relative">
          <div className="h-[200px] bg-gray-defaultCover" />
          <label htmlFor="cover">
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 bg-black/60 hover:bg-black/80 rounded-full">
              <div className="flex justify-center items-center w-12 h-12 cursor-pointer bg-gray- rounded-full">
                <UploadImageIcon className="cursor-pointer w-5 h-5 text-white" />
              </div>
            </div>
          </label>
        </div>
      )}
      {avatar ? (
        <div>
          <div className="absolute -bottom-1/3 left-4 w-[145px] h-[145px] overflow-hidden border-4 border-white rounded-full">
            <img
              className="z-10 brightness-75 w-full h-full object-cover"
              src={avatar.avatarURL!}
              alt="Profile"
            />
          </div>

          <label htmlFor="avatar" className="absolute z-10 left-16 -bottom-6">
            <div className="bg-black/50 hover:bg-black/80 rounded-full">
              <div className="flex justify-center items-center w-12 h-12 cursor-pointer bg-gray- rounded-full">
                <UploadImageIcon className="cursor-pointer w-5 h-5 text-white" />
              </div>
            </div>
          </label>
        </div>
      ) : (
        <div className="absolute -bottom-1/3 left-4 w-[145px] h-[145px] rounded-full border-4 border-white bg-gray-50" />
      )}
    </div>
  );
};

export default EditCoverAndAvatar;
