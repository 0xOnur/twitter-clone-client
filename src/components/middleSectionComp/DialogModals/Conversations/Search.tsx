import { SearchIcon } from "@icons/Icon";

interface IProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ searchText, setSearchText }: IProps) => {
  return (
    <div className="bg-white border-b">
      <label className="flex flex-row w-full items-center group/search">
        <div className="pl-4">
          <SearchIcon className="w-5 h-5 group-focus-within/search:fill-primary-base" />
        </div>
        <div className="w-full leading-5 ">
          <input
            autoFocus
            type="text"
            placeholder="Search people"
            value={searchText}
            className="p-3 w-full outline-none text-black"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>
      </label>
    </div>
  );
};

export default Search;
