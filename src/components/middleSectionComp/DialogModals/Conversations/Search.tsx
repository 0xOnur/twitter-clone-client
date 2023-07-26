import { SearchIcon } from "@icons/Icon";

const Search = () => {
  return (
    <div className="bg-white border-b">
      <label className="flex flex-row w-full items-center group/search">
        <div className="pl-4">
          <SearchIcon className="w-5 h-5 group-focus-within/search:fill-primary-base" />
        </div>
        <div className="w-full leading-5 ">
          <input
            className="p-3 w-full outline-none text-black"
            type="text"
            placeholder="Search people"
          />
        </div>
      </label>
    </div>
  );
};

export default Search;
