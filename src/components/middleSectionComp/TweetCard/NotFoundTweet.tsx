const NotFoundTweet = () => {
  return (
    <article className="relative cursor-pointer max-w-full overflow-hidden group/tweet">
      <div className="absolute w-full h-full -z-10 opacity-40 group-hover/tweet:bg-[color:var(--background-third)] duration-200" />
      <div className="py-2 px-4 min-w-fit">
        <div className="px-1 py-3 border-2 border-[color:var(--color-primary)] rounded-xl">
          <span className="px-3 font-semibold text-[color:var(--color-base-secondary)]">
            This Tweet was deleted by the Tweet author.
          </span>
        </div>
      </div>
    </article>
  );
};

export default NotFoundTweet;
