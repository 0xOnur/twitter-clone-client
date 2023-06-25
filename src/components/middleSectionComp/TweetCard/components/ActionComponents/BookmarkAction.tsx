import { BookmarksIcon } from "@icons/Icon";

const BookmarkAction = () => {
  return (
    <button title="Bookmark" className="group h-5 min-h-max">
      <div className="flex flex-row">
        <div className="inline-flex relative text-gray-dark group-hover:text-primary-base duration-150">
          <div className="absolute -m-2 group-hover:bg-primary-hover duration-150 rounded-full top-0 right-0 left-0 bottom-0"></div>
          <BookmarksIcon isActive={false} className={"w-5 h-5"} />
        </div>
      </div>
    </button>
  );
};

export default BookmarkAction;
