import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <div className="flex flex-row flex-grow-1 font-roboto items-center">
      <SearchIcon fontSize="large" />
      <input
        type="text"
        placeholder="Filter..."
        className=" text-white bg-neutral-800 p-2 w-full text-lg"
      />
    </div>
  );
};

export default SearchBar;
