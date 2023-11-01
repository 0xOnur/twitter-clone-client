import { useDebouncedSearchUser } from "@hooks/useSearchUser";
import { CancelIcon, SearchIcon, LoadingIcon } from "@icons/Icon";
import { useState, useEffect, useRef} from "react";
import UserList from "./UserList";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchResultsRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useDebouncedSearchUser(searchText);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node) &&
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className="fixed top-0 xl:w-350px md:w-290px z-10">
      <div className="py-1 bg-[color:var(--background-primary)] group">
        <div className="flex items-center space-x-4 p-3 m-1 bg-[color:var(--background-third)] rounded-full focus-within:ring-1 focus-within:ring-[color:var(--color-primary)] ">
          <div>
            <SearchIcon className="w-5 h-5 text-[color:var(--color-base-secondary)] group-focus-within:text-[color:var(--color-primary)]" />
          </div>
          <input
            type="text"
            ref={searchInputRef}
            onFocus={onFocus}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            placeholder="Search Twitter"
            className="placeholder-[color:var(--color-base-secondary)] font-semibold bg-transparent focus:outline-none w-full "
          />
          {searchText.length > 0 && (
            <button
              onClick={() => setSearchText("")}
              type="button"
              title="Clear"
              className="right-5 items-center bg-[color:var(--color-primary)] hover:opacity-80 p-1 rounded-full duration-200"
            >
              <CancelIcon className="w-4 h-4 text-[color:var(--background-primary)]" />
            </button>
          )}
        </div>
        {isFocused && (
          <div
            ref={searchResultsRef}
            className="w-full shadow-box bg-[color:var(--background-primary)] rounded-xl overflow-hidden"
          >
            <div className="flex flex-col min-h-[100px] max-h-[80vh] overflow-y-auto">
              {isLoading && searchText.length > 0 && (
                <div className="flex w-full h-full mt-5 items-center justify-center">
                  <LoadingIcon />
                </div>
              )}
              {searchText.length === 0 && (
                <div className="p-3 pt-5">
                  <span className="text-[color:var(--color-base-secondary)]">Try searching for people, topics, or keywords</span>
                </div>
              )}
              {data?.length! > 0 && (
                <div className="p-3 pt-5">
                  <span>Search for {searchText}</span>
                </div>
              )}
              {data?.length! === 0 && (
                <div className="p-3 pt-5">
                  <span>No results found for {searchText}</span>
                </div>
              )}

              {data?.map((user, index) => (
                <UserList key={index} user={user} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
