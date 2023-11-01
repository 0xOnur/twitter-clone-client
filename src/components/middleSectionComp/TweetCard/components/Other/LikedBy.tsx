import { LikeIcon } from "@icons/Icon";

interface IProps {
  likedUser: IUser;
}

const LikedBy = ({ likedUser }: IProps) => {
  return (
    <div className="relative">
    <div className="absolute w-full h-full -z-10 opacity-40 group-hover/tweet:bg-[color:var(--background-third)] duration-200" />
    <a
      href={`/${likedUser.username}`}
      className="flex flex-row gap-3 relative items-center -my-1 pt-2"
    >
      <div className="basis-12">
        <span className="float-right">
          <LikeIcon
            className={"w-4 h-4 text-[color:var(--color-base-secondary)]"}
          />
        </span>
      </div>
      <span className="font-semibold leading-5 text-[color:var(--color-base-secondary)] hover:underline">
        {likedUser.displayName} Liked
      </span>
    </a>
  </div>
  );
};

export default LikedBy;
