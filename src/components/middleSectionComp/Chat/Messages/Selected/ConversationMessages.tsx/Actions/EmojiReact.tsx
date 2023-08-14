import { LikePlusIcon } from "@icons/Icon";

const EmojiReact = () => {
  return (
    <button>
      <div className="flex justify-center min-w-[36px] min-h-[36px] hover:bg-primary-extraLight duration-200 rounded-full">
        <div className="flex grow font-bold text-center items-center justify-center">
          <LikePlusIcon className="w-5 h-5 fill-gray-dark" />
        </div>
      </div>
    </button>
  );
};

export default EmojiReact;
