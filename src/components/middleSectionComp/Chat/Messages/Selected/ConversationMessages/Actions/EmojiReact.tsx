import { LikePlusIcon } from "@icons/Icon";

const EmojiReact = () => {
  return (
    <button>
      <div className="flex justify-center min-w-[36px] min-h-[36px] relative">
        <div className="absolute inset-0 w-full h-full hover:bg-[color:var(--color-primary)] opacity-10 duration-200 rounded-full" />
        <div className="flex grow font-bold text-center items-center justify-center">
          <LikePlusIcon className="w-5 h-5 text-[color:var(--color-base-secondary)]" />
        </div>
      </div>
    </button>
  );
};

export default EmojiReact;
