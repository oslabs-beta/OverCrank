import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { ClickType } from '../types/types';

type Props = {
  expandClick: ClickType;
  collapseClick: ClickType;
};

const SearchBar: React.FC<Props> = (props): JSX.Element => {
  const { expandClick, collapseClick } = props;
  return (
    <div className='flex flex-row flex-grow-1 font-roboto items-center gap-x-2'>
      <SearchIcon fontSize='large' />
      <input
        type='text'
        placeholder='Filter...'
        className=' text-white bg-neutral-800 p-2 w-full text-lg'
      />
      <Button
        className='p-2'
        variant='outlined'
        sx={{ color: 'white', borderColor: 'white' }}
        onClick={expandClick}
      >
        Expand
      </Button>
      <Button
        className='p-2'
        variant='outlined'
        sx={{ color: 'white', borderColor: 'white' }}
        onClick={collapseClick}
      >
        Collapse
      </Button>
    </div>
  );
};

export default SearchBar;
