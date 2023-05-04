import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { ClickType, elementInfo, NodeData, ClickAction } from '../types/types';
import React, { useEffect, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type Props = {
  expandClick: ClickType;
  collapseClick: ClickType;
  notifyCollapse: boolean;
  nodeData: NodeData;
};

const SearchBar: React.FC<Props> = (props): JSX.Element => {
  const { expandClick, collapseClick, notifyCollapse, nodeData } = props;

  const [searchElements, setSearchElements] = useState<HTMLElement[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [currentSearchItem, setCurrentSearchItem] = useState<number>(0);
  const [isArrowVisible, setIsArrowVisible] = useState<boolean>(true);
  const [redraw, setRedraw] = useState<boolean>(false);
  const [isCollapsing, setIsCollapsing] = useState<boolean>(false);

  // Enables and disabled the up and down search arrows
  useEffect(() => {
    setIsArrowVisible(searchElements.length > 0 && searchText !== '');
  }, [searchElements, searchText]);

  // Search for specified text through list of objects
  // NOTE: It is bad practice to directly access the HTML elements of our page using React; however, MUI-5 deprecated the scrollInto functionality found in MUI-4 and provides not alternative mechanism to force the window to be scrolled into.
  useEffect(() => {
    // console.log('Search useEffect called');
    const foundMatches: HTMLElement[] = [];
    const treeItems = document.querySelectorAll('.MuiTreeItem-label');
    treeItems.forEach((el) => {
      const htmlElement = el as HTMLElement;
      if (htmlElement.textContent) {
        const isTextPresentInElement =
          searchText !== '' &&
          htmlElement.textContent.includes(searchText.toUpperCase());
        // Add mark tag to items matching the search
        if (
          isTextPresentInElement &&
          htmlElement.firstChild?.nodeType === Node.TEXT_NODE
        ) {
          // console.log(htmlElement);
          // console.log(htmlElement.childNodes);
          foundMatches.push(htmlElement);
          htmlElement.innerHTML = `<mark>${htmlElement.innerHTML}</mark>`;
        }
      }
    });

    setSearchElements(foundMatches);
    setCurrentSearchItem(0);
    // console.log('Found Matches:', foundMatches);
  }, [redraw]);

  // Remove all mark tags
  useEffect(() => {
    const treeItems = document.querySelectorAll('.MuiTreeItem-label');
    treeItems.forEach((el) => {
      const htmlElement = el as HTMLElement;
      if (htmlElement.firstChild?.nodeName.toLowerCase() === 'mark') {
        const text = htmlElement.firstChild.textContent || '';
        // console.log('Removed mark on:', htmlElement);
        htmlElement.replaceChild(
          document.createTextNode(text),
          htmlElement.firstChild
        );
      }
    });

    setSearchElements([]);
    // NOTE: As a temporary hold over to avoid state conflict between toggled and untoggled, the window is expanded when searching.
    if (isCollapsing) {
      setIsCollapsing(false);
    } else {
      setRedraw(!redraw);
      if (searchText !== '') expandClick();
    }
  }, [notifyCollapse, searchText]);

  // Force scrolling to the position of the element
  useEffect(() => {
    console.log('force scroll useEffect called');
    if (searchElements.length > 0 && currentSearchItem < searchElements.length)
      searchElements[currentSearchItem].scrollIntoView();
    // console.log('force scroll completed');
  }, [currentSearchItem]);

  const moveToNextItem = () => {
    setCurrentSearchItem((currentSearchItem + 1) % searchElements.length);
  };

  const moveToPrevItem = () => {
    if (currentSearchItem === 0)
      setCurrentSearchItem(searchElements.length - 1);
    else setCurrentSearchItem(currentSearchItem - 1);
  };

  const resetSearch = () => {
    setCurrentSearchItem(0);
    setSearchElements([]);
    setIsCollapsing(true);
    setSearchText('');
    collapseClick();
  };

  const collapseAction = () => {
    resetSearch();
  };

  return (
    <div className='flex flex-row flex-grow-1 font-roboto items-center gap-x-2'>
      <SearchIcon fontSize='large' />
      <input
        type='text'
        placeholder='Filter...'
        onChange={(e) => setSearchText(String(e.target.value))}
        className=' text-white bg-neutral-800 p-2 w-full text-lg'
        value={searchText}
      ></input>
      {isArrowVisible ? (
        <>
          <KeyboardArrowUpIcon onClick={moveToPrevItem} />
          <KeyboardArrowDownIcon onClick={moveToNextItem} />
          <span>
            <p className=' text-white text-md'>{`${currentSearchItem + 1}/${
              searchElements.length
            }`}</p>
          </span>
        </>
      ) : (
        <></>
      )}

      <Button
        // className='m-3'
        variant='outlined'
        sx={{
          color: 'white',
          borderColor: 'white',
          padding: '10px',
          minWidth: '100px',
        }}
        onClick={expandClick}
      >
        {' '}
        Expand{' '}
      </Button>
      <Button
        // className='m-3'
        variant='outlined'
        sx={{
          color: 'white',
          borderColor: 'white',
          padding: '10px',
          minWidth: '100px',
        }}
        onClick={collapseAction}
      >
        {' '}
        Collapse{' '}
      </Button>
    </div>
  );
};

export default SearchBar;
