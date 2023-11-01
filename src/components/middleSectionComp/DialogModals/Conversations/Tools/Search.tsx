import { SearchIcon } from "@icons/Icon";

interface IProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ searchText, setSearchText }: IProps) => {
  return (
    <div className="bg-[color:var(--background-primary)] border-b-2 border-[color:var(--background-third)]">
      <label className="flex flex-row w-full items-center group/search">
        <div className="pl-5">
          <SearchIcon className="w-5 h-5 text-[color:var(--color-base-secondary)] group-focus-within/search:text-[color:var(--color-primary)]" />
        </div>
        <div className="w-full leading-5 ">
          <input
            tabIndex={0}
            autoFocus
            type="text"
            placeholder="Search people"
            value={searchText}
            className="p-3 w-full outline-none bg-transparent text-[color:var(--color-base)] placeholder:text-[color:var(--color-base-secondary)]"
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
