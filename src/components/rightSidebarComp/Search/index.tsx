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
      <div className="py-1 bg-white">
        <div className="flex items-center space-x-4 p-3 m-1 bg-gray-rightbar rounded-full text-gray-600 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-base">
          <div className="">
            <SearchIcon className="w-5 h-5" />
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
            className="placeholder-black bg-transparent focus:outline-none w-full "
          />
          {searchText.length > 0 && (
            <button
              onClick={() => setSearchText("")}
              type="button"
              title="Clear"
              className="right-5 items-center bg-primary-base hover:bg-primary-dark text-white p-0.5 rounded-full"
            >
              <CancelIcon className="w-5 h-5" />
            </button>
          )}
        </div>
        {isFocused && (
          <div
            ref={searchResultsRef}
            className="w-full border shadow-xl bg-white rounded-xl overflow-hidden"
          >
            <div className="flex flex-col min-h-[100px] max-h-[80vh] overflow-y-auto">
              {isLoading && searchText.length > 0 && (
                <div className="flex w-full h-full mt-5 items-center justify-center">
                  <LoadingIcon />
                </div>
              )}
              {searchText.length === 0 && (
                <div className="p-3 pt-5">
                  <span>Try searching for people, topics, or keywords</span>
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
