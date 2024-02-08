import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../../store/searchSlice";

function SearchInput() {
  const dispatch = useDispatch();
  const searchText = useSelector((state) => state.search.searchText);

  return (
    <div className="relative flex flex-1">
      <label htmlFor="search-field" className="sr-only">
        Search
      </label>
      <MagnifyingGlassIcon
        className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-blue-400"
        aria-hidden="true"
      />
      <input
        id="search-field"
        className="block h-full w-full border-0 py-0 pl-8 pr-0 text-blue-900 placeholder:text-blue-400 focus:ring-0 sm:text-sm"
        placeholder="Search..."
        type="search"
        onChange={(e) => {
          dispatch(setSearchText(e.target.value));
        }}
        name="search"
        value={searchText}
      />
    </div>
  );
}

export default SearchInput;
