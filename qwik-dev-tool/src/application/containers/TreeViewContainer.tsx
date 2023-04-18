import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import buildTree from '../algorithms/parseHtml';
import testDOM from '../algorithms/getHtmlTest';
import { elementInfo } from '../types/types';
import SearchBar from '../components/SearchBar'
import Box from '@mui/material/Box';

const tree: elementInfo[] = buildTree(testDOM);

const TreeViewContainer = () => {
    return (
      <div className='flex flex-col bg-color h-full w-3/5'>
        <SearchBar></SearchBar>
          <TreeView
            className='h-full'
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ maxHeight: '75vh', width: 'auto', flexGrow: 1, overflowY: 'auto' }}
            >
              {tree[tree.length - 1].element}
          </TreeView>
      </div>
     )
}


export default TreeViewContainer;