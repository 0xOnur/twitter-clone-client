const NotFoundTweet = () => {
  return (
    <article className="cursor-pointer hover:bg-gray-tweetHover duration-200 max-w-full overflow-hidden">
      <div className="px-4 min-w-fit">
        <div className="flex flex-col py-2">
          <div className="flex flex-row items-center px-1 py-3 border rounded-2xl bg-gray-extraLight">
            <span className="px-3">
              This Tweet was deleted by the Tweet author.
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default NotFoundTweet;
