import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { ClickType, elementInfo, NodeData } from '../types/types';
import React, {
  useEffect,
  useState,
  useRef,
  createRef,
  SetStateAction,
  Dispatch,
} from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type Props = {
  expandClick: ClickType;
  collapseClick: ClickType;
  setSelectedItem: Dispatch<SetStateAction<string>>;
  nodeData: NodeData;
};

interface Ref {
  [index: number]: any;
}

const SearchBar: React.FC<Props> = (props): JSX.Element => {
  const { expandClick, collapseClick, setSelectedItem, nodeData } = props;

  const [searchElements, setSearchElements] = useState<[string, elementInfo][]>(
    []
  );
  const [searchText, setSearchText] = useState<string>('');
  const [currentSearchItem, setCurrentSearchItem] = useState<number>(0);
  const [isArrowVisible, setIsArrowVisible] = useState<boolean>(true);

  
  // const elementRefs = useRef(
  //   Object.entries(nodeData).map((element) => {
  //     createRef();
  //   })
  // );

  // Enables and disabled the up and down search arrows
  useEffect(() => {
    setIsArrowVisible(searchElements.length > 0 && searchText !== '');
  }, [searchElements, searchText]);

  // Search for specified text through list of objects
  useEffect(() => {
    console.log('Search useEffect called');
    if (searchText !== '') {
      const foundMatches: [string, elementInfo][] = [];
      Object.entries(nodeData).forEach((element) => {
        // console.log(element);
        if (element[1].label.includes(searchText.toUpperCase())) {
          foundMatches.push(element);
        }
      });

      setSearchElements(foundMatches);
      console.log('Found Matches:', foundMatches);
    }
  }, [searchText]);

  // Force scrolling to the position of the element
  useEffect(() => {
    console.log('force scroll useEffect called');
    // if (Object.keys(nodeData).length > 0) {
    //   console.log(
    //     'Node Element Selected for scrollIntoView',
    //     nodeData[searchElements[currentSearchItem][0]]
    //   );
    //   const elementRef = nodeData[searchElements[currentSearchItem][0]].ref;
    //   if (elementRef.current) elementRef.current.scrollIntoView();
    // }
    if (searchElements.length > 0)
      setSelectedItem(searchElements[currentSearchItem][0]);
    console.log('force scroll completed');
  }, [currentSearchItem]);

  const moveToNextItem = () => {
    setCurrentSearchItem((currentSearchItem + 1) % searchElements.length);
  };

  const moveToPrevItem = () => {
    if (currentSearchItem === 0) setCurrentSearchItem(searchElements.length);
    else setCurrentSearchItem(currentSearchItem - 1);
  };

  return (
    <div className='flex flex-row flex-grow-1 font-roboto items-center gap-x-2'>
      <SearchIcon fontSize='large' />
      <input
        type='text'
        placeholder='Filter...'
        onChange={(e) => setSearchText(String(e.target.value))}
        className=' text-white bg-neutral-800 p-2 w-full text-lg'
      ></input>
      {isArrowVisible ? (
        <>
          <KeyboardArrowUpIcon onClick={moveToPrevItem} />
          <KeyboardArrowDownIcon onClick={moveToNextItem} />
          <span>
            <p className=' text-white text-md'>{`${currentSearchItem}/${searchElements.length}`}</p>
          </span>
        </>
      ) : (
        <></>
      )}

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
