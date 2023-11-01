import { ReTweetIcon } from "@icons/Icon";

interface IProps {
  reTweeterUser: IUser;
}

const ReTweetedBy = ({ reTweeterUser }: IProps) => {
  return (
    <div className="relative">
      <div className="absolute w-full h-full -z-10 opacity-40 group-hover/tweet:bg-[color:var(--background-third)] duration-200" />
      <a
        href={`/${reTweeterUser.username}`}
        className="flex flex-row gap-3 relative items-center -my-1 pt-2"
      >
        <div className="basis-12">
          <span className="float-right">
            <ReTweetIcon
              className={"w-4 h-4 text-[color:var(--color-base-secondary)]"}
            />
          </span>
        </div>
        <span className="font-semibold leading-5 text-[color:var(--color-base-secondary)] hover:underline">
          {reTweeterUser.displayName} Retweeted
        </span>
      </a>
    </div>
  );
};

export default ReTweetedBy;
