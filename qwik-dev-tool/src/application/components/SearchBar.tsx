import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
    return (
    <div className=" flex flex-row flex-grow-1 font-roboto">
        <SearchIcon />
        <input 
            type='text'
            placeholder="Filter..."
            className=" text-white bg-neutral-800 p-2 w-full justify-center"
        />
    </div>
    

    )
}


export default SearchBar;